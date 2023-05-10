<template>
  <div>
    <b-card>
      <b-card-title>SKUID: {{ $route.params.skuid }} | SKUNAME: {{ $route.params.skuname }}</b-card-title>
      <b-card-title></b-card-title>
      <b-card>
        <v-client-table
          :columns="columns"
          :options="options"
          :data="deliveryBuffers"
        >
        </v-client-table>
      </b-card>
      <b-card v-if="deliveryBuffers.length > 0">
        <delivery-buffer-barcode :skuid="$route.params.skuid" :skuname="$route.params.skuname" @selected="showUpdateSKU" />
      </b-card>
    </b-card>
    <div>
      <b-modal ref="modalUpdateConfirm" title="Update SKU" @ok="updateSKU" @cancel="cancelUpdate" ok-title="Yes confirm" cancel-title="No don't map" no-enforce-focus>
        <div v-if="selectedProduct" class="d-block text-center">
          <h4>Would you like to add '{{ $route.params.skuid }} | {{ $route.params.skuname }}' with '{{ selectedProduct.productname }}/{{selectedProduct.barcode}}' in the above invoices and map the data for future invoices?</h4>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import DeliveryBufferBarcode from './DeliveryBufferBarcode'
export default {
  name: "DeliveryBufferUpdate",
  components: {
    DeliveryBufferBarcode
  },
  computed: mapState({
    deliveryBuffers: (state) => state.deliveryBuffer.bySKU,
  }),

  data() {
    return {
      selectedProduct: null,
      columns: ["distributorname", "invoicenumber", 'storename', 'qty', 'deliverydate'],
      options: {
        headings: {
          distributorname: 'Distributor',
          invoicenumber: "Invoice Number",
          storename: 'Store',
          deliverydate: "Delivery Date"
        },
        sortable: [],
        filterable: false,
        pagination: {
          show: true,
        },
      },
    };
  },
  methods: {
    showUpdateSKU(selected) {
      this.selectedProduct = selected
      this.$refs.modalUpdateConfirm.show()
    },
    updateSKU() {
      Vue.axios.post('updateSKU', {
        skuid: this.$route.params.skuid,
        skuname: this.deliveryBuffers[0].skuname,
        productid: this.selectedProduct.productid
      })
      .then((response) => {
        this.showSuccessMsg()
        this.$store.dispatch("deliveryBuffer/getBySKU", {
          skuid: this.$route.params.skuid,
        });
      })
      .catch((error) => {
        this.showErrorMsg()
      })
    },
    cancelUpdate() {
      this.selectedProduct = null
    }
  },
  created() {
    this.$store.dispatch("deliveryBuffer/getBySKU", {
      skuid: this.$route.params.skuid,
    });
  },
};
</script>
