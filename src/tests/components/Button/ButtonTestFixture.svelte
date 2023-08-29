<script lang="ts">
	import Button from '~/components/base/button/Button.svelte';
    export let onClick: () => void = () => {};
    export let networkStatus: 'INITIAL' | 'PENDING' | 'SUCCESS' | 'ERROR' = 'INITIAL';
    export let revertDuration = 1000;
</script>

<Button on:click={onClick} {networkStatus} {revertDuration} let:networkStatus>
   <span>
       Hello world, {networkStatus}
   </span>
</Button>
