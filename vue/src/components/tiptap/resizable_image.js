import Image from '@tiptap/extension-image'
import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import ResizableImageTemplate from './ResizableImageTemplate.vue'

export default Node.create({
	name: 'CustomImage',

	group: 'block',

	atom: true,

  	addAttributes() {
		// Return an object with attribute configuration
		return {
			...this.parent?.(),
			src: {
				default: '',
				renderHTML: attributes => {
					// … and return an object with HTML attributes.
					return {
						src: attributes.src,
					};
				},
			},

			// align 속성 추가
            align: {
                default: null,
            },

			width: {
				renderHTML: ({ width }) => ({ width }),
			},

			height: {
				renderHTML: ({ height }) => ({ height }),
			},

			isDraggable: {
				default: true,
				// We don't want it to render on the img tag
				renderHTML: attributes => {
					return {};
				},
			},
		};
	},

	parseHTML() {
		return [
		{
			tag: 'CustomImage',
		},
		]
	},

	renderHTML({ HTMLAttributes }) {
		return ['CustomImage', mergeAttributes(HTMLAttributes)]
	},

	addNodeView() {
		return VueNodeViewRenderer(ResizableImageTemplate)
	},
})