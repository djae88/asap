<template>
    <editor-content
        :editor="editor"
        style="min-height:200px;"
    />
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
// import Card from './Card.js'
import Iframe from './Iframe.js'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
// import TableHeader from '@tiptap/extension-table-header'
import { CustomTableHeader } from "./CustomTableHeader.js";

// CustomImage를 위해 필요
import { Node } from '@tiptap/core'

export default {
    components: {
        EditorContent,
    },

    props: {
        options: Object
    },

    data: () => ({
        editor: null
    }),

    mounted() {
        const CustomImage = Node.create({
            name: 'customImage',
            inline: true,
            group: 'inline',
            draggable: true,

            addAttributes() {
                return {
                    src: {},
                    width: {
                        default: null,
                    },
                    height: {
                        default: null,
                    },
                    align: {}
                }
            },

            parseHTML() {
                return [
                    {
                        tag: 'customimage[src]',
                        getAttrs: dom => ({
                            src: dom.getAttribute('src'),
                            // align 속성도 파싱합니다.
                            align: dom.style.justifyContent === 'flex-start' ? 'justify-start' :
                                dom.style.justifyContent === 'center' ? 'justify-center' :
                                dom.style.justifyContent === 'flex-end' ? 'justify-end' : null
                        }),
                    },
                ]
            },

            renderHTML({ HTMLAttributes }) {
                // align 값에 따라 적용할 스타일을 결정합니다.
                let alignStyle = '';
                switch (HTMLAttributes.align) {
                    case 'justify-start':
                        alignStyle = 'flex-start';
                        break;
                    case 'justify-center':
                        alignStyle = 'center';
                        break;
                    case 'justify-end':
                        alignStyle = 'flex-end';
                        break;
                    default:
                        alignStyle = 'flex-start'; // 기본값을 설정합니다.
                }

                // 이미지를 감싸는 div에 flex 스타일을 적용합니다.
                return [
                    'div', 
                    { style: `display: flex; justify-content: ${alignStyle};` }, 
                    ['img', HTMLAttributes]
                ]
            }
        })

        this.editor = new Editor({
            extensions: [
                StarterKit,
                Underline,
                Link,
                FontFamily,
                FontSize,
                CustomImage,
                Image.configure({
                    inline: true,
                }),
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                TextStyle,
                Color,
                Iframe,
                Table.configure({
                    resizable: true,
                }),
                TableRow,
                CustomTableHeader,
                TableCell,
            ],
            content: this.options.content,
            editable:false,
        })
    },

    beforeUnmount() {
        this.editor.destroy()
    }
}
</script>

<style lang="scss">
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
</style>