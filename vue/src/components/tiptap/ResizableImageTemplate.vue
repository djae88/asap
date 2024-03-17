<template>
    <node-view-wrapper
        as="div"
        class="image-container d-flex"
        :class="node.attrs.align"
    >
        <div
            class="pa-0 ma-0 parent-hover"
            style="position:relative; line-height:0px; z-index:2"
        >
            <img
                v-bind="node.attrs"
                ref="resizableImg"
                :draggable="isDraggable"
                :data-drag-handle="isDraggable"
                class="ma-0 pa-0"
                style="margin:0px !important; padding:0px !important;"
            />
            <v-icon
                class="icon-hide"
                style="position:absolute; top:-4px; left:-4px; z-index:3; cursor:nwse-resize;"
                color="blue"
                ref="icon"
                size="20"
                @mousedown="onMouseDown"
            >
                mdi-square-outline
            </v-icon>
            <v-icon
                class="icon-hide"
                style="position:absolute; top:-4px; right:-4px; z-index:3; cursor:nesw-resize;"
                color="blue"
                ref="icon"
                size="20"
                @mousedown="onMouseDown"
            >
                mdi-square-outline
            </v-icon>
            <v-icon
                class="icon-hide"
                style="position:absolute; bottom:-4px; left:-4px; z-index:3; cursor:nesw-resize;"
                color="blue"
                ref="icon"
                size="20"
                @mousedown="onMouseDown"
            >
                mdi-square-outline
            </v-icon>
            <v-icon
                class="icon-hide"
                style="position:absolute; bottom:-4px; right:-4px; z-index:3; cursor:nwse-resize;"
                color="blue"
                ref="icon"
                size="20"
                @mousedown="onMouseDown"
            >
                mdi-square-outline
            </v-icon>

            <div
                class="icon-hide"
                style="position:absolute; top:-1px; left:-1px; width:13px; height:13px; background:white; z-index:1;"
            ></div>
            <div
                class="icon-hide"
                style="position:absolute; top:-1px; right:-1px; width:13px; height:13px; background:white; z-index:1;"
            ></div>
            <div
                class="icon-hide"
                style="position:absolute; bottom:-1px; left:-1px; width:13px; height:13px; background:white; z-index:1;"
            ></div>
            <div
                class="icon-hide"
                style="position:absolute; bottom:-1px; right:-1px; width:13px; height:13px; background:white; z-index:1;"
            ></div>
        </div>
    </node-view-wrapper>
</template>
<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2'
export default {
    components: {
        NodeViewWrapper,
    },

    props: nodeViewProps,

    data: () => ({
        isResizing: false,
        lastMovement: {},
        count: 0,
    }),

    computed: {
        isDraggable() {
            return this.node?.attrs?.isDraggable
        },
    },

    methods: {
        onMouseDown(e) {
            e.preventDefault()
            this.isResizing = true
            window.addEventListener('mousemove', this.throttle(this.onMouseMove))
            window.addEventListener('mouseup', this.onMouseUp)
        },

        onMouseUp(e) {
            e.preventDefault()
            this.isResizing = false
            this.lastMovement = {}
            window.removeEventListener('mousemove', this.throttle(this.onMouseMove))
            window.removeEventListener('mouseup', this.onMouseUp)
        },

        throttle(fn, wait = 120, leading = true) {
            let prev = 0, timeout, lastargs
            return (...args) => {
                const now = Date.now()
                lastargs = args

                if (!leading && !timeout) {
                    prev = now
                }

                const remaining = wait - (now - prev)
                if (remaining <= 0 || remaining > wait) {
                    if (timeout) {
                        clearTimeout(timeout)
                        timeout = null
                    }
                    prev = now
                    fn.apply(this, lastargs)
                } else if (!timeout && leading) {
                    timeout = setTimeout(() => {
                        timeout = null
                        prev = leading ? Date.now() : 0
                        fn.apply(this, lastargs)
                    }, remaining)
                }
            }
        },

        onMouseMove(e) {
            e.preventDefault()
            if (!this.isResizing) {
                return
            }
            if (!Object.keys(this.lastMovement).length) {
                this.lastMovement = { x: e.x, y: e.y }
                return
            }
            if (e.x === this.lastMovement.x && e.y === this.lastMovement.y) {
                return
            }
            let nextX = e.x - this.lastMovement.x
            let nextY = e.y - this.lastMovement.y
            const width = this.$refs.resizableImg.width + nextX
            const height = this.$refs.resizableImg.height + nextY
            this.lastMovement = { x: e.x, y: e.y }
            this.updateAttributes({ width, height })
        },
    },
}
</script>
<style lang="scss" scoped>
.image-container:hover {
    .hidden {
        visibility: visible !important;
    }
}

.image-container {
    overflow: hidden;
    position: relative;
}

.parent-hover {
    border: 2px solid white;
    transition: border-color 0.2s;
}

.icon-hide {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
}

.parent-hover:hover, .parent-hover:active {
    border: 2px solid #2196F3; 
    transition: border-color 0.2s;
}

.parent-hover:hover .icon-hide {
    opacity: 1;
    visibility: visible;
}

.parent-hover:active .icon-hide {
    opacity: 1;
    visibility: visible;
}
</style>