import TComponent from '../common/component';
import config from '../common/config';
const { prefix } = config;
const classPrefix = `${prefix}-tab-bar`;

TComponent({
  relations: {
    './tab-bar-item': {
      type: 'descendant',
      linked() {
        this.updateChildren();
      },
      // linkChanged() {
      //   this.updateChildren();
      // },
      // unlinked() {
      //   this.updateChildren();
      // },
    },
  },
  data: {
    classPrefix,
    defaultNameIndex: -1,
  },
  properties: {
    value: {
      type: [Array, Number, String],
      value: 0,
      observer: 'updateChildren',
    },
  },
  methods: {
    updateChildren() {
      const items = this.getRelationNodes('./tab-bar-item');
      const len = items.length;
      const { value } = this.data;

      if (len > 0) {
        items.forEach((item) => {
          item.checkActive(value);
        });
      }
    },
    updateValue(value) {
      this.setData(
        {
          value,
        },
        () => {
          this.updateChildren();
        },
      );
      this.triggerEvent('change', value);
    },
    /**
     * 对于没有 name 的 item 生成一个 name
     */
    initName() {
      const nameIndex = this.data.defaultNameIndex + 1;

      this.setData({
        defaultNameIndex: nameIndex,
      });
      return nameIndex;
    },
  },
});
