<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <router-view></router-view>
      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <li><a href="/">NOTIFICATION</a></li>
        <li><a href="/setup">SETUP</a></li>
        <li><a href="/marketing">MARKETING</a></li>
        <li><a href="/purchasing">PURCHASING</a></li>
        <li><a href="/inventory">INVENTORY</a></li>
        <li><a href="/accounting">ACCOUNTING</a></li>
        <li><a href="/fixed-asset">FIXED ASSET</a></li>
        <li><a href="/hris">HRIS</a></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {};
</script>
