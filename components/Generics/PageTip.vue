<template>
  <div class="page-tip">
    <div
      v-for="pp in p.text"
      :key="pp"
      class="text"
    >
      {{ pp }}
    </div>
  </div>
</template>

<script
  lang="ts"
  setup
>

  const p = defineProps<{
    text: string[]
  }>()

</script>

<style
  lang="scss"
  scoped
>
  .page-tip {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 50px);

    .text {
      width: calc(100% - 20px);
      text-align: center;
      line-height: 30px;
      color: rgba(255, 255, 255, 0.2);
      font-size: 18px;
      font-weight: 600;
    }
  }
</style>