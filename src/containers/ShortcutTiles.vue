<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3" v-if="$auth.check('closeshift')">
        <b-link :to="{name: 'Close Shift'}">
        <div class="brand-card">
          <div class="brand-card-header bg-facebook">
            <i class="fa fa-coffee"></i>
          </div>
          <div class="brand-card-body">
            <span>Close Shift</span>
          </div>
        </div>
        </b-link>
      </b-col>
      <b-col sm="6" lg="3" v-if="$auth.check('invoices')">
        <b-link :to="{name: 'Manage Invoices'}">
          <div class="brand-card">
            <div class="brand-card-header bg-twitter">
              <i class="cui-cart"></i>
            </div>
            <div class="brand-card-body">
              <span>Manage Invoices</span>
            </div>
          </div>
        </b-link>
      </b-col>
      <b-col sm="6" lg="3" v-if="$auth.check('product')">
        <b-link :to="{name: 'Manage Products'}">
        <div class="brand-card">
          <div class="brand-card-header bg-linkedin">
            <i class="fa fa-barcode"></i>
          </div>
          <div class="brand-card-body">
            <span>Manage Products</span>
          </div>
        </div>
        </b-link>
      </b-col>
      <b-col sm="6" lg="3" v-if="$auth.check('intrastorepool')">
        <b-link :to="{name: 'IntraStore Pool'}">
        <div class="brand-card">
          <div class="brand-card-header bg-google-plus">
            <i class="fa fa-handshake-o"></i>
          </div>
          <div class="brand-card-body">
            <span>Intrastore Pool</span>
          </div>
        </div>
        </b-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6" lg="3" v-if="$auth.check('banking')">
        <b-link :to="{name: 'Banking'}">
        <div class="brand-card">
          <div class="brand-card-header bg-info">
            <i class="fa fa-dollar"></i>
          </div>
          <div class="brand-card-body">
            <span>Banking</span>
          </div>
        </div>
        </b-link>
      </b-col>
      <b-col sm="6" lg="3" v-if="$auth.check('stocktake')">
        <b-link :to="{name: 'Stock Take'}">
          <div class="brand-card">
            <div class="brand-card-header bg-success">
              <i class="fa fa-star"></i>
            </div>
            <div class="brand-card-body">
              <span>Stock Take</span>
            </div>
          </div>
        </b-link>
      </b-col>
      <b-col sm="6" lg="3" v-if="$auth.check('promotion')">
        <b-link :to="{name: 'Manage Promotions'}">
        <div class="brand-card">
          <div class="brand-card-header bg-warning">
            <i class="fa fa-bullhorn"></i>
          </div>
          <div class="brand-card-body">
            <span>Manage Promotions</span>
          </div>
        </div>
        </b-link>
      </b-col>
      <b-col sm="6" lg="3" v-if="$auth.check('stocklevel')">
        <b-link :to="{name: 'Stock Level'}">
        <div class="brand-card">
          <div class="brand-card-header bg-primary">
            <i class="cui-sun"></i>
          </div>
          <div class="brand-card-body">
            <span>Stock Level</span>
          </div>
        </div>
        </b-link>
      </b-col>
    </b-row>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'ShortcutTiles',
  data: () => {
    return {}
  },
}
</script>

<style lang="scss">
a:hover {
   text-decoration:none;
}
</style>
