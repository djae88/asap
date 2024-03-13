// @flow
/* eslint-disable no-unused-vars */
import { mergeAttributes } from "@tiptap/core";
import TableHeader from "@tiptap/extension-table-header";

export const CustomTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth
            ? colwidth.split(",").map((item) => parseInt(item, 10))
            : null;

          return value;
        }
      },
      style: {
        default: null
      }
    };
  },
  renderHTML({ HTMLAttributes }) {
    let totalWidth = 0;
    let fixedWidth = true;

    if (HTMLAttributes.colwidth) {
      HTMLAttributes.colwidth.forEach((col) => {
        if (!col) {
          fixedWidth = false;
        } else {
          totalWidth += col;
        }
      });
    } else {
      fixedWidth = false;
    }

    if (fixedWidth && totalWidth > 0) {
      HTMLAttributes.style = `width: ${totalWidth}px;`;
    } else if (totalWidth && totalWidth > 0) {
      HTMLAttributes.style = `min-width: ${totalWidth}px`;
    } else {
      HTMLAttributes.style = null;
    }

    return [
      "th",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0
    ];
  }
});
