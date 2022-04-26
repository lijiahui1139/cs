<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    // if (icon) {
    //   vnodes.push(<svg-icon icon-class={icon} />);
    // }
    if (title) {
      // 多级菜单
      vnodes.push(
        <span slot="title">
          <i class={icon}></i>
          <span class="sub-title ml-20">{title}</span>
        </span>
      );
    }

    return vnodes;
  },
};
</script>
