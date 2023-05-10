<template>
  <div>
    <table class="table">
      <tr>
        <td>Deployment Name</td>
        <td>{{storeStatus.remote_deployment.deployment_name}}</td>
      </tr>
      <tr>
        <td>Store Head</td>
        <td>{{storeStatus.current_head}}</td>
      </tr>
      <tr>
        <td>Repo Head</td>
        <td>{{storeStatus.remote_deployment.current_head}}</td>
      </tr>
      <tr>
        <td>Repo Address</td>
        <td>{{storeStatus.remote_deployment.repo_address}}</td>
      </tr>
      <tr>
        <td>Repo API</td>
        <td>{{storeStatus.remote_deployment.repo_api}}</td>
      </tr>
      <tr>
        <td>Last Updated</td>
        <td>{{storeStatus.remote_deployment.updated_at}}</td>
      </tr>
      <tr>
        <td>Last Store Sync</td>
        <td>{{storeStatus.last_online}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'StoreStatusDetail',
    props: {
      storeStatus: Object
    }
  }
</script>
