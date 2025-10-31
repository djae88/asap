// ============================================
// Cashlink 결제 전환 추적 코드
// ============================================
// 버전: 1.0.0
// 용도: 광고주 결제 완료 페이지에 삽입할 코드
// 참조: payment_based_implementation_plan.md
// ============================================

(function() {
	'use strict'

	// ============================================
	// 1. URL 파라미터 및 쿠키에서 tracking_code 읽기
	// ============================================

	function getUrlParameter(name) {
		const urlParams = new URLSearchParams(window.location.search)
		return urlParams.get(name)
	}

	function getCookie(name) {
		const cookies = document.cookie.split(';')
		for (let cookie of cookies) {
			const [key, value] = cookie.trim().split('=')
			if (key === name) {
				return decodeURIComponent(value)
			}
		}
		return null
	}

	// 1-1. URL 파라미터에서 tracking_code 읽기 (최초 방문 시)
	let tracking_code = getUrlParameter('cashlink_tracking')

	// 1-2. URL 파라미터가 있으면 광고주 도메인 쿠키에 저장
	if (tracking_code) {
		const cookieMaxAge = 30 * 24 * 60 * 60 // 30일
		document.cookie = 'cashlink_tracking=' + tracking_code + '; max-age=' + cookieMaxAge + '; path=/; SameSite=Lax'
		console.log('[Cashlink] Tracking code saved from URL parameter:', tracking_code)
	}

	// 1-3. URL 파라미터가 없으면 쿠키에서 읽기 (이미 저장된 경우)
	if (!tracking_code) {
		tracking_code = getCookie('cashlink_tracking')
	}

	// tracking_code가 없으면 전환 추적 불가 (직접 접속한 경우)
	if (!tracking_code) {
		console.log('[Cashlink] No tracking code found. Conversion not tracked.')
		return
	}

	console.log('[Cashlink] Tracking code found:', tracking_code)

	// ============================================
	// 2. URL에서 결제 정보 추출
	// ============================================

	// PG사마다 파라미터명이 다를 수 있음
	// 예시: 토스페이먼츠, KG이니시스, NHN KCP 등
	const order_id =
		getUrlParameter('orderId') ||      // 토스페이먼츠
		getUrlParameter('orderNo') ||      // 기타 PG사
		getUrlParameter('order_no') ||
		getUrlParameter('moid') ||         // KG이니시스
		'UNKNOWN-' + Date.now()

	const amount_str =
		getUrlParameter('amount') ||       // 토스페이먼츠
		getUrlParameter('Amt') ||          // KG이니시스
		getUrlParameter('goodsAmt') ||     // NHN KCP
		'0'

	const conversion_value = parseInt(amount_str, 10) || 0

	// ============================================
	// 3. 전환 데이터 구성
	// ============================================

	const conversion_data = {
		tracking_code: tracking_code,
		conversion_type: 'purchase',
		conversion_value: conversion_value,
		order_id: order_id,
		metadata: {
			user_agent: navigator.userAgent,
			page_url: window.location.href,
			referrer: document.referrer,
			timestamp: new Date().toISOString()
		}
	}

	console.log('[Cashlink] Conversion data:', conversion_data)

	// ============================================
	// 4. Cashlink 서버로 전환 기록 전송
	// ============================================

	// Cashlink API 엔드포인트
	const API_ENDPOINT = 'https://cashlink.kr/api/conversion/create'

	fetch(API_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(conversion_data)
	})
		.then(function(response) {
			if (!response.ok) {
				return response.json().then(function(error) {
					throw new Error(error.statusMessage || 'Conversion tracking failed')
				})
			}
			return response.json()
		})
		.then(function(data) {
			console.log('[Cashlink] Conversion tracked successfully:', data)

			// 성공 시 쿠키 삭제 (중복 전환 방지)
			document.cookie = 'cashlink_tracking=; max-age=0; path=/; SameSite=Lax'

			// 전환 성공 이벤트 발생 (광고주가 활용 가능)
			if (window.dispatchEvent) {
				const event = new CustomEvent('cashlink:conversion', {
					detail: data
				})
				window.dispatchEvent(event)
			}
		})
		.catch(function(error) {
			console.error('[Cashlink] Conversion tracking error:', error)

			// 에러 발생해도 사용자 경험에 영향 없도록 조용히 처리
			// 선택: 에러 로깅 서비스로 전송
		})

	// ============================================
	// 5. 폴백: fetch 미지원 브라우저 대응
	// ============================================

	// 오래된 브라우저를 위한 img 태그 폴백 (선택사항)
	// var img = new Image()
	// img.src = API_ENDPOINT + '?tracking_code=' + encodeURIComponent(tracking_code) +
	//           '&conversion_value=' + conversion_value + '&order_id=' + encodeURIComponent(order_id)

})()
