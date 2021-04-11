

<script>

export default {
  methods: {
    onClick () {},
  },
}
</script>


<template>
  <div data-tag-info="{&quot;line&quot;:14,&quot;column&quot;:3,&quot;view&quot;:&quot;/foo/bar/example.vue&quot;}" >foo</div>

  <MyComponent data-tag-info="{&quot;line&quot;:16,&quot;column&quot;:3,&quot;view&quot;:&quot;/foo/bar/example.vue&quot;,&quot;component&quot;:&quot;MyComponent&quot;}" >
    <div data-tag-info="{&quot;line&quot;:17,&quot;column&quot;:5,&quot;view&quot;:&quot;/foo/bar/example.vue&quot;}" >hi</div>
  </MyComponent>

  <div data-tag-info="{&quot;line&quot;:20,&quot;column&quot;:3,&quot;view&quot;:&quot;/foo/bar/example.vue&quot;}"  class="foobar">
    <a data-tag-info="{&quot;line&quot;:21,&quot;column&quot;:5,&quot;view&quot;:&quot;/foo/bar/example.vue&quot;}"  href="">
      bar
      <img data-tag-info="{&quot;line&quot;:23,&quot;column&quot;:7,&quot;view&quot;:&quot;/foo/bar/example.vue&quot;}"  src="" alt="">
    </a>
  </div>
  <div data-tag-info="{&quot;line&quot;:26,&quot;column&quot;:3,&quot;view&quot;:&quot;/foo/bar/example.vue&quot;}"  @click="onClick">foobar</div>
</template>

