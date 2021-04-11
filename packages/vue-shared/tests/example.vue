

<script>

export default {
  methods: {
    onClick () {},
  },
}
</script>


<template>
  <div>foo</div>

  <MyComponent>
    <div>hi</div>
  </MyComponent>

  <div class="foobar">
    <a href="">
      bar
      <img src="" alt="">
    </a>
  </div>
  <div @click="onClick">foobar</div>
</template>

