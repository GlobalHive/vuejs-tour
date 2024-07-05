# Create a tour
In this guide, you will learn how to create a tour using the `vuejs-tour` package.

## Creating Steps
First of all, you need to create an array of steps. Each step should have a `target` and `content` property. The `target` property is a CSS selector that points to the element that the step should target. The `content` property is the text that will be displayed in the tour.
```vue
<script setup lang='ts'>
    import HelloWorld from './components/HelloWorld.vue';
    import { VTour } from '@globalhive/vuejs-tour';
    import '@globalhive/vuejs-tour/dist/style.css';
    
    const steps = [{ // [!code ++:10]
        target: '[data-step="0"]',
        content: 'Step 1',
    },{
        target: '.some-class',
        content: 'Step 2',
    },{
        target: '#some-id',
        content: 'Step 3',
    }];
</script>
```

After creating the steps, you need to pass them to the `VTour` component as a prop.
```vue{2}
<template>
    <VTour/> // [!code --]
    <VTour :steps="steps"/> // [!code ++]
    <div>
        <a href="https://vitejs.dev" target="_blank"> // [!code --]
        <a data-step="0" href="https://vitejs.dev" target="_blank"> // [!code ++]
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank"> // [!code --]
        <a href="https://vuejs.org/" target="_blank" class="some-class"> // [!code ++]
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <HelloWorld msg="Vite + Vue" /> // [!code --]
    <HelloWorld id="some-id" msg="Vite + Vue" /> // [!code ++]
</template>
```

## Starting the Tour
To start the tour, you can use the `autoStart` prop. Or you can start the tour manually by calling the `startTour` method on the `VTour` component.

### Using `autoStart` prop
```vue
<template>
    <VTour :steps="steps"/> // [!code --]
    <VTour :steps="steps" autoStart/> // [!code ++]
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
</template>
```

### Using `startTour` method
```vue
<script setup lang='ts'>
    import HelloWorld from './components/HelloWorld.vue';
    import { VTour } from '@globalhive/vuejs-tour';
    import '@globalhive/vuejs-tour/dist/style.css';
    
    const steps = [...];
    const vTour = ref(); // [!code ++:2]
    vTour.value.startTour();
</script>

<template>
  <VTour :steps="steps"/> // [!code --]
  <VTour :steps="steps" ref="vTour"/> // [!code ++]
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>
```

That's it! You have successfully created a tour using the `vuejs-tour` package.

## What's next?
- [Customization](./start-options)
- [Reference](../reference/coming-soon)

