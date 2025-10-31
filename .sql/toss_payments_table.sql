-- 토스페이먼츠 결제 정보 테이블
-- 생성일: 2025-10-01
-- 설명: 토스페이먼츠 API를 통한 결제 정보 저장

DROP TABLE IF EXISTS `toss_payments`;

CREATE TABLE `toss_payments` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '고유 ID',
  `payment_key` varchar(200) NOT NULL COMMENT '토스페이먼츠 결제 키',
  `order_id` varchar(64) NOT NULL COMMENT '주문 ID (고유값)',
  `order_name` varchar(100) DEFAULT NULL COMMENT '주문명',
  `amount` int NOT NULL COMMENT '결제 금액',
  `status` varchar(20) NOT NULL COMMENT '결제 상태 (READY, IN_PROGRESS, WAITING_FOR_DEPOSIT, DONE, CANCELED, PARTIAL_CANCELED, ABORTED, EXPIRED)',
  `method` varchar(20) DEFAULT NULL COMMENT '결제 수단 (카드, 가상계좌, 계좌이체 등)',
  `customer_name` varchar(100) DEFAULT NULL COMMENT '고객명',
  `approved_at` datetime DEFAULT NULL COMMENT '결제 승인 시각',
  `canceled_at` datetime DEFAULT NULL COMMENT '결제 취소 시각',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 시각',
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 시각',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_payment_key` (`payment_key`),
  UNIQUE KEY `uk_order_id` (`order_id`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='토스페이먼츠 결제 정보';

-- 결제 상태 설명:
-- READY: 결제를 생성하면 가지게 되는 초기 상태
-- IN_PROGRESS: 결제수단 정보와 해당 결제수단의 소유자가 맞는지 인증을 마친 상태
-- WAITING_FOR_DEPOSIT: 가상계좌 결제 흐름에만 있는 상태로, 결제 고객이 가상계좌에 입금하는 것을 기다리고 있는 상태
-- DONE: 인증된 결제수단으로 결제승인에 성공한 상태
-- CANCELED: 승인된 결제가 취소된 상태
-- PARTIAL_CANCELED: 승인된 결제가 부분 취소된 상태
-- ABORTED: 결제 승인이 실패한 상태
-- EXPIRED: 결제 유효 시간 30분이 지나 거래가 취소된 상태
