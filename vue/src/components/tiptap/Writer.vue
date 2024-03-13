<template>
    <v-sheet outlined class="rounded-10">
        <div v-if="editor" class="menubar d-flex align-center px-1">
            <!-- Undo -->
            <v-btn text x-small height="30" @click="editor.chain().focus().undo().run()">
                <v-img
                    contain width="8" height="12"
                    :src="require('@/assets/tiptap/undo.svg')"
                    title="실행취소"
                />
            </v-btn>

            <!-- Redo -->
            <v-btn text x-small height="30" @click="editor.chain().focus().redo().run()">
                <v-img
                    contain width="8" height="12"
                    :src="require('@/assets/tiptap/redo.svg')"
                    title="다시실행"
                />
            </v-btn>

            <!-- 글자 크기 -->
            <v-sheet width="88" class="mx-1 fontSizeSelect">
                <v-select
                    style="font-size:12px"
                    :menu-props="{offsetY: true, maxHeight:500 }"
                    height="30" dense outlined hide-details 
                    :items="font_size_select_list"
                    v-model="selected_font_size"
                    @change="editor.chain().focus().setFontSize(selected_font_size).run()"
                ></v-select>
            </v-sheet>

            <!-- 글자 색상 -->
            <v-sheet rounded height="30" class="px-1 d-flex align-center" style="border:1px solid #9e9e9e;">
                <v-icon small style="margin-top:2px; margin-right:4px;" color="grey darken-3">mdi-format-color-text</v-icon>
                <v-menu v-model="menu" offset-y nudge-bottom="10" :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                        <div :style="swatchStyle" v-on="on" />
                    </template>
                    <v-color-picker 
                        v-model="color"
                        show-swatches
                        @input="editor.chain().focus().setColor($event).run(); "
                    ></v-color-picker>
                    <v-sheet class="pa-1">
                        <v-btn small class="blue" dark block depressed @click="menu = false">닫기</v-btn>
                    </v-sheet>
                </v-menu>
            </v-sheet>

            <!-- 구분선 -->
            <v-sheet class="transparent" @click="editor.chain().focus().setHorizontalRule().run()">
                <v-btn text x-small height="30" title="구분선">
                    <v-icon small>mdi-minus</v-icon>
                </v-btn>
            </v-sheet>

            <!-- Bold -->
            <v-btn text x-small height="30" title="굵게" @click="editor.chain().focus().toggleBold().run()">
                <v-icon small :class="{ 'blue--text': editor.isActive('bold') }">mdi-format-bold</v-icon>
            </v-btn>

            <!-- Italic -->
            <v-btn text x-small height="30" title="기울임" @click="editor.chain().focus().toggleItalic().run()">
                <v-icon small :class="{ 'blue--text': editor.isActive('italic') }">mdi-format-italic</v-icon>
            </v-btn>

            <!-- 취소선 -->
            <v-btn text x-small height="30" title="취소선" @click="editor.chain().focus().toggleStrike().run()">
                <v-icon small :class="{ 'blue--text': editor.isActive('strike') }">mdi-format-strikethrough</v-icon>
            </v-btn>

            <!-- 밑줄 -->
            <v-btn text x-small height="30" title="밑줄" @click="editor.chain().focus().toggleUnderline().run()">
                <v-icon small :class="{ 'blue--text': editor.isActive('underline') }">mdi-format-underline</v-icon>
            </v-btn>

            <!-- 인용구 -->
            <v-btn text x-small height="30" title="인용구" @click="editor.chain().focus().toggleBlockquote().run()">
                <v-icon small :class="{ 'blue--text': editor.isActive('blockquote') }">mdi-format-quote-close</v-icon>
            </v-btn>
            
            <!-- 정렬 -->
            <v-btn text x-small height="30" title="정렬" @click="submenu.text_align=!submenu.text_align">
                <v-icon v-if="editor.isActive({ textAlign: 'left' })" small :class="{ 'blue--text': editor.isActive({ textAlign: 'left' }) }">mdi-format-align-left</v-icon>
                <v-icon v-if="editor.isActive({ textAlign: 'center' })" small :class="{ 'blue--text': editor.isActive({ textAlign: 'center' }) }">mdi-format-align-center</v-icon>
                <v-icon v-if="editor.isActive({ textAlign: 'right' })" small :class="{ 'blue--text': editor.isActive({ textAlign: 'right' }) }">mdi-format-align-right</v-icon>
            </v-btn>

            <!-- 하이퍼링크 -->
            <v-btn text x-small height="30" title="링크" @click="setLink">
                <v-icon small :class="{ 'blue--text': editor.isActive('link') }">mdi-link-variant</v-icon>
            </v-btn>

            <!-- 이미지 -->
            <v-btn
                title="이미지"
                class="menubar__button"
                x-small
                height="30"
                text
                :class="options.supportImage ? '' : 'is-disabled'"
                @click="imageDialog = true"
            >
                <v-icon small color="blue">mdi-image-plus</v-icon>
            </v-btn>

            <!-- 동영상 -->
            <v-btn
                title="유튜브"
                class="menubar__button"
                x-small
                height="30"
                text
                :class="options.supportVideo ? '' : 'is-disabled'"
                @click="videoDialog = true"
            >
                <v-icon small color="red">mdi-youtube</v-icon>
            </v-btn>

            <!-- 목록 -->
            <v-btn text x-small height="30" title="목록" @click="submenu.list=!submenu.list">
                <v-icon small :color="submenu.list? 'blue':''">mdi-format-list-bulleted</v-icon>
            </v-btn>

            <!-- 테이블 -->
            <v-btn text x-small height="30" title="테이블" @click="submenu.table=!submenu.table">
                <v-icon small :color="submenu.table? 'blue':'grey darken-1'">mdi-table-large</v-icon>
            </v-btn>
        </div>

        <!-- 테이블 상세기능 -->
        <v-sheet class="menubar2 d-flex align-center px-1" v-if="submenu.table">
            <v-btn text x-small height="30" @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
                <v-icon small>mdi-table-plus</v-icon>
            </v-btn>
            <v-btn text x-small height="30" @click="editor.chain().focus().deleteTable().run()">
                <v-icon small>mdi-table-remove</v-icon>
            </v-btn>
            <v-btn text x-small height="30" @click="editor.chain().focus().addColumnBefore().run()">
                <v-icon small>mdi-table-column-plus-before</v-icon>
            </v-btn>
            <v-btn text x-small height="30" @click="editor.chain().focus().addColumnAfter().run()">
                <v-icon small>mdi-table-column-plus-after</v-icon>
            </v-btn>
            <v-btn text x-small height="30" @click="editor.chain().focus().deleteColumn().run()">
                <v-icon small>mdi-table-column-remove</v-icon>
            </v-btn>
            <v-btn text x-small height="30" @click="editor.chain().focus().addRowBefore().run()">
                <v-icon small>mdi-table-row-plus-before</v-icon>
            </v-btn>
            <v-btn text x-small height="30" @click="editor.chain().focus().addRowAfter().run()">
                <v-icon small>mdi-table-row-plus-after</v-icon>
            </v-btn>
            <v-btn text x-small height="30" @click="editor.chain().focus().deleteRow().run()">
                <v-icon small>mdi-table-row-remove</v-icon>
            </v-btn>
            <v-btn text x-small height="30" @click="editor.chain().focus().mergeCells().run()">
                <v-icon small>mdi-table-merge-cells</v-icon>
            </v-btn>
            <v-btn text x-small height="30" @click="editor.chain().focus().splitCell().run()">
                <v-icon small>mdi-table-split-cell</v-icon>
            </v-btn>
            <v-btn text x-small height="30" @click="editor.chain().focus().toggleHeaderCell().run()">
                <v-icon small>mdi-table-headers-eye</v-icon>
            </v-btn>
        </v-sheet>

        <!-- 정렬 상세기능 -->
        <v-sheet class="menubar2 d-flex align-center px-1" v-if="submenu.text_align">
            <!-- 왼쪽 정렬 -->
            <v-btn text x-small height="30" @click="editor.chain().focus().setTextAlign('left').run()">
                <v-icon small :class="{ 'blue--text': editor.isActive({ textAlign: 'left' }) }">mdi-format-align-left</v-icon>
            </v-btn>
            <!-- 가운데 정렬 -->
            <v-btn text x-small height="30" @click="editor.chain().focus().setTextAlign('center').run()">
                <v-icon small :class="{ 'blue--text': editor.isActive({ textAlign: 'center' }) }">mdi-format-align-center</v-icon>
            </v-btn>
            <!-- 오른쪽 정렬 -->
            <v-btn text x-small height="30" @click="editor.chain().focus().setTextAlign('right').run()">
                <v-icon small :class="{ 'blue--text': editor.isActive({ textAlign: 'right' }) }">mdi-format-align-right</v-icon>
            </v-btn>
        </v-sheet>

        <!-- 목록 상세기능 -->
        <v-sheet class="menubar2 d-flex align-center px-1" v-if="submenu.list">
            <!-- 기호목록 -->
            <v-btn text x-small height="30" @click="editor.chain().focus().toggleBulletList().run()">
                <v-icon small :class="{ 'blue--text': editor.isActive('bulletList') }">mdi-circle-medium</v-icon>
            </v-btn>
            <!-- 숫자 목록 -->
            <v-btn text x-small height="30" @click="editor.chain().focus().toggleOrderedList().run()">
                <v-icon :class="{ 'blue--text': editor.isActive('orderedList') }">mdi-numeric</v-icon>
            </v-btn>
        </v-sheet>

        <!-- 에디터 -->
        <v-sheet 
            @drop.prevent="onDrop" 
            @dragover="checkDrop($event)" 
            @paste="checkPaste($event)"
            class="rounded-10"
            style="overflow:scroll"
        >
            <editor-content :editor="editor" class="px-4 py-8" style="min-height:300px; max-height:720px; overflow:scroll font-size:11pt;" />
        </v-sheet>

        <!-- Dialog (이미지) -->
        <v-dialog
            v-model="imageDialog"
            width="auto"
            content-class="rounded-10"
        >
            <v-sheet width="480" class="rounded-15 px-12 pt-8 pb-4" color="#F8F7FB">
                <!-- 제목 -->
                <p class="mb-6 font-weight-bold text-center" style="font-size:24px;">
                    이미지 넣기
                </p>

                <clipper-basic
                    :src="url"
                    ref="clipper"
                    class="my-clipper"
                    :init-width="100"
                    :init-height="100"
                >
                    <v-sheet
                        slot="placeholder"
                        class="placeholder text-center grey--text py-6 rounded-10"
                        style="background:transparent;"
                        outlined
                    >
                        이미지가 없습니다
                    </v-sheet>
                </clipper-basic>

                <!-- 파일 입력 -->
                <v-file-input
                    class="rounded-10 mt-4"
                    outlined
                    clear-icon
                    show-size
                    color="primary"
                    prepend-icon=""
                    prepend-inner-icon="mdi-folder-open-outline"
                    placeholder="여기를 클릭 후 파일을 선택해주세요."
                    accept="image/*"
                    v-model="selectedFile"
                    @change="image_onFileChange"
                ></v-file-input>

                <!-- 제출 -->
                <v-btn
                    height="42"
                    dark
                    depressed
                    color="#615DFA"
                    class="font-weight-bold rounded-10 d-block px-10 mx-auto"
                    @click="insertImage()"
                >
                    이미지 넣기
                </v-btn>
            </v-sheet>
        </v-dialog>

        <!-- Dialog (동영상) -->
        <v-dialog
            v-model="videoDialog"
            width="auto"
            content-class="rounded-10"
        >
            <v-sheet width="480" class="rounded-15 pt-8 pb-10 px-12" color="#F8F7FB">
                <!-- 제목 -->
                <p class="mb-6 font-weight-bold text-center" style="font-size:24px;">
                    유튜브 넣기
                </p>

                <!-- 링크 입력 -->
                <v-text-field
                    class="rounded-10"
                    color="red"
                    outlined
                    hide-details
                    single-line
                    label="유튜브 링크를 붙여넣기해주세요."
                    prepend-icon=""
                    prepend-inner-icon="mdi-youtube"
                    v-model="videoURL"
                >
                </v-text-field>

                <!-- 정렬 -->
                <v-sheet class="d-flex justify-space-between pt-4 mb-4" color="transparent">
                    <v-btn
                        width="120"
                        class="rounded-10"
                        depressed
                        :dark="video_align=='left'"
                        :class="video_align=='left'?'red':''"
                        @click="video_align='left'"
                    >
                        왼쪽 정렬
                    </v-btn>
                    <v-btn
                        width="120"
                        class="rounded-10"
                        depressed
                        :dark="video_align=='center'"
                        :class="video_align=='center'?'red':''"
                        @click="video_align='center'"
                    >
                        가운데 정렬
                    </v-btn>
                    <v-btn
                        width="120"
                        class="rounded-10"
                        depressed
                        :dark="video_align=='right'"
                        :class="video_align=='right'?'red':''"
                        @click="video_align='right'"
                    >
                        오른쪽 정렬
                    </v-btn>
                </v-sheet>

                <!-- 제출 -->
                <v-btn
                    height="48"
                    class="rounded-10"
                    color="red"
                    depressed
                    block
                    dark
                    @click="insertVideo()"
                >
                    유튜브 넣기
                </v-btn>
            </v-sheet>
        </v-dialog>
    </v-sheet>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import FontSize from '@tobiasafischer/tiptap-extension-font-size'
import FontFamily from '@tiptap/extension-font-family'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Iframe from './Iframe.js'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'

export default {
    components: {
        EditorContent,
    },

    props: {
        index: Number,
        options: Object
    },

    data: () => ({
        editor: null,
        cardDialog: false,
        cardTab: null,
        cardDetail_id:"",
        cardImage: "",

        imageDialog: false,
        videoDialog: false,
        imageTab: null,
        fileURL: null,
        videoURL: null,
        selectedFile: null,
        limit: 280,

        // 글자 크기
        font_size_select_list: ["8pt", "9pt", "10pt", "11pt", "12pt", "14pt", "18pt", "24pt", "32pt"],
        selected_font_size: "11pt",

        // 글자 색상
        dialog: {
            color_picker: false,
            cardList:false,
            cardDetail: false
        },
        color: '#000000',
		menu: false,

        // 서브 메뉴
        submenu: {
            card: false,
            table: false,
            text_align: false,
            list: false
        },

        video_align: "left",
        url: ""
    }),

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit,
                Underline,
                Link,
                Image.configure({
                    inline: true,
                }),
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                TextStyle,
                Color,
                FontFamily,
                FontSize,
                Iframe,
                Table.configure({
                    resizable: true,
                }),
                TableRow,
                TableHeader,
                TableCell,
                CharacterCount,
                Placeholder.configure({
                    placeholder: '이미지 첨부하면 썸네일 등록',
                })
            ],
            content: this.options.content,
            editable:true,
            autofocus: true,
            onUpdate: () => {
                this.options.content = this.editor.getHTML()
                this.$emit('contentUpdated', this.options.content, this.index)
            },
        })

        this.editor.on('selectionUpdate', ({ editor }) => {
            if(editor.getAttributes('textStyle').fontSize==undefined){
                this.selected_font_size = '11pt'
            }else{
                this.selected_font_size = editor.getAttributes('textStyle').fontSize
            }

            // Focus 변경시 글자색상 인식
            if(editor.getAttributes('textStyle').color==undefined){
                this.color = '#000000'
            }else{
                this.color = editor.getAttributes('textStyle').color
            }
        })
    },

    // 글자 색상
    computed: {
        swatchStyle() {
            const { color, menu } = this
            return {
                backgroundColor: color,
                cursor: 'pointer',
                height: '20px',
                width: '20px',
                borderRadius: menu ? '50%' : '4px',
                transition: 'border-radius 200ms ease-in-out'
            }
        }
    },

    beforeUnmount() {
        this.editor.destroy()
    },

    methods: {
        // Copy & Paste (파일 있을시 파일 업로드 Call)
        checkPaste(e){
            console.log(e)
            if(e.clipboardData.files.length){
                this.uploadFile(e.clipboardData.files[0])
            }
        },

        // Drag & Drop (기본 이벤트 차단)
        checkDrop(e) {
            e.preventDefault()
        },

        // Drag & Drop (파일 업로드 Call)
        async onDrop(e){
            let test = e.dataTransfer.files
            for(let i=0; i<test.length; i++){
                await this.uploadFile(test[i])
            }
        },

        // 링크 추가
        setLink() {
            const previousUrl = this.editor.getAttributes('link').href
            const url = window.prompt('URL', previousUrl)
            // cancelled
            if (url === null) {
                return
            }
            // empty
            if (url === '') {
                this.editor.chain().focus().extendMarkRange('link').unsetLink().run()
                return
            }
            // update link
            this.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        },

        // 이미지 입력 > 파일 선택
        image_onFileChange: function () {
            this.url = URL.createObjectURL(this.selectedFile)
        },

        // 이미지 입력 > 제출
        insertImage: _.debounce(function() {

            // Crop 이미지 파일로 변환
            const canvas = this.$refs.clipper.clip() //call component's clip method
            var imgDataUrl = canvas.toDataURL("image/webp", 0.5) //canvas->image
            var binaryData = atob(imgDataUrl.split(',')[1])
            var array = []
            for (var i = 0; i < binaryData.length; i++) {
                array.push(binaryData.charCodeAt(i));
            }
            var file = new File([new Uint8Array(array)], "filename.png", {type: 'image/png'})

            if(file.name=='image.png'){
                this.editor.chain().focus().undo().run()
            }
            let formData = new FormData()
            formData.append('image', file)

            this.$http.post('/api/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {
                    type: "board"
                }
            }).then((res) => {
                let url = '/upload/board/'+res.data
                this.editor.chain().focus().setImage({ src: url }).run()
                this.imageDialog = false
            }).catch((err) => {
                console.log('FAILURE!!'+ err)
            });
        }, 10),

        // 동영상 입력
        insertVideo() {
            if (this.videoURL) {
                let url = this.videoURL.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')
                url = url.replace('https://youtu.be/', 'https://www.youtube.com/embed/')

                // 정렬
                let style = ""
                if(this.video_align == "left"){
                    style = "float:left;"
                }else if(this.video_align == "center"){
                    style = "display:block; margin:0 auto;"
                }else if(this.video_align == "right"){
                    style = "float:right;"
                }

                this.editor.chain().focus().setIframe({ src: url, style: style }).run()
                this.editor.commands.focus()
                this.videoDialog = false
                this.video_align = ''
            }
        },
    }
}
</script>
<style lang="scss">
.ProseMirror p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.ProseMirror p.is-empty::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

/* Basic editor styles */
.ProseMirror {
    > * + * {
        margin-top: 0.75em;
    }

    ul, ol {
        padding: 0 1rem;
    }

    h1, h2, h3, h4, h5, h6 {
        line-height: 1.1;
    }

    p{
        line-height:1.1rem;
    }

    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    pre {
        background: #0D0D0D;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
        }
    }

    img {
        max-width: 480px;
        height: auto;
    }

    blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0D0D0D, 0.1);
    }

    hr {
        border: none;
        border-top: 2px solid rgba(#0D0D0D, 0.1);
        margin: 2rem 0;
    }

    .iframe-wrapper {
        width: 640px;
        height: 360px;

        iframe {
            position: relative;
            width: 640px;
            height: 360px;
        }
    }

    table {
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
        margin: 0;
        overflow: hidden;

        td, th {
            min-width: 1em;
            border: 1px solid #ccc;
            padding: 8px;
            margin:0;
            vertical-align: top;
            box-sizing: border-box;
            position: relative;
            > * {
                margin-bottom: 0 !important;
            }
        }

        th {
            font-weight: bold;
            text-align: center;
            background:#efefef !important;
        }

        .selectedCell:after {
            z-index: 2;
            position: absolute;
            content: "";
            left: 0; right: 0; top: 0; bottom: 0;
            background: rgba(200, 200, 255, 0.4);
            pointer-events: none;
        }

        .column-resize-handle {
            position: absolute;
            right: -2px; top: 0; bottom: 0;
            width: 4px;
            z-index: 20;
            background-color: #adf;
            pointer-events: none;
        }
    }

    .tableWrapper {
        margin: 1em 0;
        overflow-x: auto;
    }
}

.ProseMirror:focus {
    outline: none;
}

// 카드
.Card {
    position:relative;
    display:inline-block;
    // border:1px solid red;
}

/* MenuBar */
.menubar{
    height:45px;
    background-color: #fbfbfb;
    border-bottom:1px solid #e0e0e0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.menubar2{
    height:45px !important;
    background-color: #fbfbfb !important;
    border-bottom:1px solid #e0e0e0 !important;
}

.explain {
    font-size:8pt;
    letter-spacing:-1px;
    color:grey;
    margin:0;
    text-align:center;
}

</style>
<style scoped>
::v-deep .v-select{
    font-size:10pt;
    font-weight:bold;
}

.fontSizeSelect ::v-deep .v-select__selections{
    line-height: 1;
}

.fontSizeSelect ::v-deep .v-select .v-icon{
    margin-bottom:9px;
    font-size:15pt;
}

.fontSizeSelect ::v-deep .v-input__slot{
    min-height:10px !important;
}
</style>
<style scoped>
.my-clipper {
    width:100%;
}

.placeholder {
    width:100%;
}
</style>