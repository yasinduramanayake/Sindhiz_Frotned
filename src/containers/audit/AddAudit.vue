<template>
  <div>
    <center>
      <h3>Add Store Audit</h3>
    </center>
    <div>
      <b-container>
        <b-card>
          <validation-observer ref="AuditValidation" #default="{ invalid }">
            <b-form @submit.prevent>
              <b-form-group>
                <v-select
                  v-model="selected"
                  label="storename"
                  :options="stores"
                />
              </b-form-group>
              <div class="moveble">
                <table class="table-bordered">
                  <tr>
                    <th>FRONT OF SHOP HEALTH</th>
                    <th>Score</th>
                    <th>Comment</th>
                    <th>Score_Total</th>
                    <th>Full_Total</th>
                  </tr>
                  <tr>
                    <td>STAFF PRESENTATION(Uniform Policy and Presentation)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STAFF PRESENTATION"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STAFF_PRESENTATION"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >

                          <b-form-radio
                            v-model="form.STAFF_PRESENTATION"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STAFF_PRESENTATION"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.STAFF_PRESENTATION_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STAFF_PRESENTATION === 'good'">
                        {{ (form.STAFF_PRESENTATION_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STAFF_PRESENTATION === 'avarage'">
                        {{ (form.STAFF_PRESENTATION_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STAFF_PRESENTATION === 'poor'">
                        {{ (form.STAFF_PRESENTATION_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STAFF_PRESENTATION">
                        {{ (form.FULL_TOTAL = form.STAFF_PRESENTATION_TOTAL) }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      STAFF COMMUNICATION(Friendly, Effective Communication)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STAFF COMMUNICATION"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STAFF_COMMUNICATION"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STAFF_COMMUNICATION"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STAFF_COMMUNICATION"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.STAFF_COMMUNICATION_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STAFF_COMMUNICATION === 'good'">
                        {{ (form.STAFF_COMMUNICATION_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STAFF_COMMUNICATION === 'avarage'">
                        {{ (form.STAFF_COMMUNICATION_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STAFF_COMMUNICATION === 'poor'">
                        {{ (form.STAFF_COMMUNICATION_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STAFF_COMMUNICATION">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.STAFF_COMMUNICATION_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      STORE IMPRESSION(Cleanliness / Display / Signage /
                      Lighting)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STORE IMPRESSION"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STORE_IMPRESSION"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_IMPRESSION"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_IMPRESSION"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.STORE_IMPRESSION_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STORE_IMPRESSION === 'good'">
                        {{ (form.STORE_IMPRESSION_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STORE_IMPRESSION === 'avarage'">
                        {{ (form.STORE_IMPRESSION_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STORE_IMPRESSION === 'poor'">
                        {{ (form.STORE_IMPRESSION_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STORE_IMPRESSION">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.STORE_IMPRESSION_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5"></td>
                  </tr>

                  <tr>
                    <th>CONFECTIONARY & DRINKS</th>
                    <th>Score</th>
                    <th>Comment</th>
                    <th>Score_Total</th>
                    <th>Full_Total</th>
                  </tr>
                  <tr>
                    <td>FRIDGE LAYOUT(Planogram)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="FRIDGE LAYOUT"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.FRIDGE_LAYOUT"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.FRIDGE_LAYOUT"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.FRIDGE_LAYOUT"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.FRIDGE_LAYOUT_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.FRIDGE_LAYOUT === 'good'">
                        {{ (form.FRIDGE_LAYOUT_TOTAL = 3) }}
                      </div>
                      <div v-if="form.FRIDGE_LAYOUT === 'avarage'">
                        {{ (form.FRIDGE_LAYOUT_TOTAL = 2) }}
                      </div>
                      <div v-if="form.FRIDGE_LAYOUT === 'poor'">
                        {{ (form.FRIDGE_LAYOUT_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.FRIDGE_LAYOUT">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.FRIDGE_LAYOUT_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      FRIDGE STOCK WEIGHT(Fridge Filled / refilled / faced
                      forward)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="FRIDGE STOCK WEIGHT"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.FRIDGE_STOCK_WEIGHT"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.FRIDGE_STOCK_WEIGHT"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.FRIDGE_STOCK_WEIGHT"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.FRIDGE_STOCK_WEIGHT_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.FRIDGE_STOCK_WEIGHT === 'good'">
                        {{ (form.FRIDGE_STOCK_WEIGHT_TOTAL = 3) }}
                      </div>
                      <div v-if="form.FRIDGE_STOCK_WEIGHT === 'avarage'">
                        {{ (form.FRIDGE_STOCK_WEIGHT_TOTAL = 2) }}
                      </div>
                      <div v-if="form.FRIDGE_STOCK_WEIGHT === 'poor'">
                        {{ (form.FRIDGE_STOCK_WEIGHT_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.FRIDGE_STOCK_WEIGHT">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.FRIDGE_STOCK_WEIGHT_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>PRICE TICKETS(Set Up and Correct)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="PRICE TICKETS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.PRICE_TICKETS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.PRICE_TICKETS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.PRICE_TICKETS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.PRICE_TICKETS_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.PRICE_TICKETS === 'good'">
                        {{ (form.PRICE_TICKETS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.PRICE_TICKETS === 'avarage'">
                        {{ (form.PRICE_TICKETS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.PRICE_TICKETS === 'poor'">
                        {{ (form.PRICE_TICKETS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.PRICE_TICKETS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.PRICE_TICKETS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>DRINKS OFFERS(2FOR and Deals Highlighted)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="DRINKS OFFERS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.DRINKS_OFFERS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.DRINKS_OFFERS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.DRINKS_OFFERS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.DRINKS_OFFERS_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.DRINKS_OFFERS === 'good'">
                        {{ (form.DRINKS_OFFERS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.DRINKS_OFFERS === 'avarage'">
                        {{ (form.DRINKS_OFFERS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.DRINKS_OFFERS === 'poor'">
                        {{ (form.DRINKS_OFFERS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.DRINKS_OFFERS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.DRINKS_OFFERS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>DRINKS STOCK ROTATION(Best Before Dates)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="DRINKS STOCK ROTATION"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.DRINKS_STOCK_ROTATION"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.DRINKS_STOCK_ROTATION"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.DRINKS_STOCK_ROTATION"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.DRINKS_STOCK_ROTATION_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.DRINKS_STOCK_ROTATION === 'good'">
                        {{ (form.DRINKS_STOCK_ROTATION_TOTAL = 3) }}
                      </div>
                      <div v-if="form.DRINKS_STOCK_ROTATION === 'avarage'">
                        {{ (form.DRINKS_STOCK_ROTATION_TOTAL = 2) }}
                      </div>
                      <div v-if="form.DRINKS_STOCK_ROTATION === 'poor'">
                        {{ (form.DRINKS_STOCK_ROTATION_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.DRINKS_STOCK_ROTATION">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.DRINKS_STOCK_ROTATION_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>FRIDGE CLEANLINESS(Inc Filters)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="FRIDGE CLEANLINESS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.FRIDGE_CLEANLINESS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.FRIDGE_CLEANLINESS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.FRIDGE_CLEANLINESS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.FRIDGE_CLEANLINESS_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.FRIDGE_CLEANLINESS === 'good'">
                        {{ (form.FRIDGE_CLEANLINESS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.FRIDGE_CLEANLINESS === 'avarage'">
                        {{ (form.FRIDGE_CLEANLINESS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.FRIDGE_CLEANLINESS === 'poor'">
                        {{ (form.FRIDGE_CLEANLINESS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.FRIDGE_CLEANLINESS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.FRIDGE_CLEANLINESS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>CONFECTIONARY RANGE(correct range)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="CONFECTIONARY RANGE"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.CONFECTIONARY_RANGE"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CONFECTIONARY_RANGE"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CONFECTIONARY_RANGE"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.CONFECTIONARY_RANGE_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.CONFECTIONARY_RANGE === 'good'">
                        {{ (form.CONFECTIONARY_RANGE_TOTAL = 3) }}
                      </div>
                      <div v-if="form.CONFECTIONARY_RANGE === 'avarage'">
                        {{ (form.CONFECTIONARY_RANGE_TOTAL = 2) }}
                      </div>
                      <div v-if="form.CONFECTIONARY_RANGE === 'poor'">
                        {{ (form.CONFECTIONARY_RANGE_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.CONFECTIONARY_RANGE">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.CONFECTIONARY_RANGE_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      CONFECTIONARY DISPLAY(Confect dsiplayed well and correct
                      stock weight / faced forward)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="CONFECTIONARY DISPLAY"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.CONFECTIONARY_DISPLAY"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CONFECTIONARY_DISPLAY"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CONFECTIONARY_DISPLAY"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.CONFECTIONARY_DISPLAY_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.CONFECTIONARY_DISPLAY === 'good'">
                        {{ (form.CONFECTIONARY_DISPLAY_TOTAL = 3) }}
                      </div>
                      <div v-if="form.CONFECTIONARY_DISPLAY === 'avarage'">
                        {{ (form.CONFECTIONARY_DISPLAY_TOTAL = 2) }}
                      </div>
                      <div v-if="form.CONFECTIONARY_DISPLAY === 'poor'">
                        {{ (form.CONFECTIONARY_DISPLAY_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.CONFECTIONARY_DISPLAY">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.CONFECTIONARY_DISPLAY_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>CONFECTIONARY STOCK ROTATION(Best Before Dates)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="CONFECTIONARY STOCK ROTATION"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.CONFECTIONARY_STOCK_ROTATION"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CONFECTIONARY_STOCK_ROTATION"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CONFECTIONARY_STOCK_ROTATION"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.CONFECTIONARY_STOCK_ROTATION_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.CONFECTIONARY_STOCK_ROTATION === 'good'">
                        {{ (form.CONFECTIONARY_STOCK_ROTATION_TOTAL = 3) }}
                      </div>
                      <div
                        v-if="form.CONFECTIONARY_STOCK_ROTATION === 'avarage'"
                      >
                        {{ (form.CONFECTIONARY_STOCK_ROTATION_TOTAL = 2) }}
                      </div>
                      <div v-if="form.CONFECTIONARY_STOCK_ROTATION === 'poor'">
                        {{ (form.CONFECTIONARY_STOCK_ROTATION_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.CONFECTIONARY_STOCK_ROTATION">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL +
                            form.CONFECTIONARY_STOCK_ROTATION_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      STORE ROOM - DRINKS(Correct stock weight and managed)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STORE ROOM - DRINKS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STORE_ROOM_DRINKS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_ROOM_DRINKS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_ROOM_DRINKS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.STORE_ROOM_DRINKS_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STORE_ROOM_DRINKS === 'good'">
                        {{ (form.STORE_ROOM_DRINKS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STORE_ROOM_DRINKS === 'avarage'">
                        {{ (form.STORE_ROOM_DRINKS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STORE_ROOM_DRINKS === 'poor'">
                        {{ (form.STORE_ROOM_DRINKS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STORE_ROOM_DRINKS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.STORE_ROOM_DRINKS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      STORE ROOM - CONFECTIONARY(Correct stock weight and
                      managed)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STORE ROOM - CONFECTIONARY"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STORE_ROOM_CONFECTIONARY"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_ROOM_CONFECTIONARY"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_ROOM_CONFECTIONARY"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.STORE_ROOM_CONFECTIONARY_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STORE_ROOM_CONFECTIONARY === 'good'">
                        {{ (form.STORE_ROOM_CONFECTIONARY_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STORE_ROOM_CONFECTIONARY === 'avarage'">
                        {{ (form.STORE_ROOM_CONFECTIONARY_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STORE_ROOM_CONFECTIONARY === 'poor'">
                        {{ (form.STORE_ROOM_CONFECTIONARY_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STORE_ROOM_CONFECTIONARY">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL +
                            form.STORE_ROOM_CONFECTIONARY_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      EXPIRED STOCK MANAGEMENT(Mark Downs / Stock Rotation /
                      Returns)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="EXPIRED STOCK MANAGEMENT"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.EXPIRED_STOCK_MANAGEMENT"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.EXPIRED_STOCK_MANAGEMENT"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.EXPIRED_STOCK_MANAGEMENT"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.EXPIRED_STOCK_MANAGEMENT_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.EXPIRED_STOCK_MANAGEMENT === 'good'">
                        {{ (form.EXPIRED_STOCK_MANAGEMENT_TOTAL = 3) }}
                      </div>
                      <div v-if="form.EXPIRED_STOCK_MANAGEMENT === 'avarage'">
                        {{ (form.EXPIRED_STOCK_MANAGEMENT_TOTAL = 2) }}
                      </div>
                      <div v-if="form.EXPIRED_STOCK_MANAGEMENT === 'poor'">
                        {{ (form.EXPIRED_STOCK_MANAGEMENT_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.EXPIRED_STOCK_MANAGEMENT">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL +
                            form.EXPIRED_STOCK_MANAGEMENT_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      COFFEE MACHINE(Cleaned daily, Maintained) SELECTED STORES
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="COFFEE MACHINE"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.COFFEE_MACHINE"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.COFFEE_MACHINE"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.COFFEE_MACHINE"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.COFFEE_MACHINE_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.COFFEE_MACHINE === 'good'">
                        {{ (form.COFFEE_MACHINE_TOTAL = 3) }}
                      </div>
                      <div v-if="form.COFFEE_MACHINE === 'avarage'">
                        {{ (form.COFFEE_MACHINE_TOTAL = 2) }}
                      </div>
                      <div v-if="form.COFFEE_MACHINE === 'poor'">
                        {{ (form.COFFEE_MACHINE_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.COFFEE_MACHINE">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.COFFEE_MACHINE_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5"></td>
                  </tr>

                  <tr>
                    <th>GIFTWARE CATEGORY</th>
                    <th>Score</th>
                    <th>Comment</th>
                    <th>Score_Total</th>
                    <th>Full_Total</th>
                  </tr>
                  <tr>
                    <td>
                      GIFTWARE DISPLAY(Presentation / Pricing /Stock Weight/
                      Range)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="GIFTWARE DISPLAY"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.GIFTWARE_DISPLAY"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.GIFTWARE_DISPLAY"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.GIFTWARE_DISPLAY"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.GIFTWARE_DISPLAY_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.GIFTWARE_DISPLAY === 'good'">
                        {{ (form.GIFTWARE_DISPLAY_TOTAL = 3) }}
                      </div>
                      <div v-if="form.GIFTWARE_DISPLAY === 'avarage'">
                        {{ (form.GIFTWARE_DISPLAY_TOTAL = 2) }}
                      </div>
                      <div v-if="form.GIFTWARE_DISPLAY === 'poor'">
                        {{ (form.GIFTWARE_DISPLAY_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.GIFTWARE_DISPLAY">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.GIFTWARE_DISPLAY_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>GIFTWARE CLEANLINESS(Dusted, etc)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="GIFTWARE CLEANLINESS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.GIFTWARE_CLEANLINESS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.GIFTWARE_CLEANLINESS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.GIFTWARE_CLEANLINESS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.GIFTWARE_CLEANLINESS_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.GIFTWARE_CLEANLINESS === 'good'">
                        {{ (form.GIFTWARE_CLEANLINESS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.GIFTWARE_CLEANLINESS === 'avarage'">
                        {{ (form.GIFTWARE_CLEANLINESS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.GIFTWARE_CLEANLINESS === 'poor'">
                        {{ (form.GIFTWARE_CLEANLINESS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.GIFTWARE_CLEANLINESS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.GIFTWARE_CLEANLINESS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>GIFTWARE PROMOTIONS(Markdowns / Events)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="GIFTWARE PROMOTIONS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.GIFTWARE_PROMOTIONS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.GIFTWARE_PROMOTIONS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.GIFTWARE_PROMOTIONS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.GIFTWARE_PROMOTIONS_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.GIFTWARE_PROMOTIONS === 'good'">
                        {{ (form.GIFTWARE_PROMOTIONS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.GIFTWARE_PROMOTIONS === 'avarage'">
                        {{ (form.GIFTWARE_PROMOTIONS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.GIFTWARE_PROMOTIONS === 'poor'">
                        {{ (form.GIFTWARE_PROMOTIONS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.GIFTWARE_PROMOTIONS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.GIFTWARE_PROMOTIONS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>GIFTWARE DAMAGES(Markdowns / Returns)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="GIFTWARE DAMAGES"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.GIFTWARE_DAMAGES"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.GIFTWARE_DAMAGES"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.GIFTWARE_DAMAGES"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.GIFTWARE_DAMAGES_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.GIFTWARE_DAMAGES === 'good'">
                        {{ (form.GIFTWARE_DAMAGES_TOTAL = 3) }}
                      </div>
                      <div v-if="form.GIFTWARE_DAMAGES === 'avarage'">
                        {{ (form.GIFTWARE_DAMAGES_TOTAL = 2) }}
                      </div>
                      <div v-if="form.GIFTWARE_DAMAGES === 'poor'">
                        {{ (form.GIFTWARE_DAMAGES_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.GIFTWARE_DAMAGES">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.GIFTWARE_DAMAGES_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5"></td>
                  </tr>

                  <tr>
                    <th>ACCESSORY CATEGORY</th>
                    <th>Score</th>
                    <th>Comment</th>
                    <th>Score_Total</th>
                    <th>Full_Total</th>
                  </tr>
                  <tr>
                    <td>ACCESSORIES RANGE(Correct Range / Additions)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="ACCESSORIES RANGE"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.ACCESSORIES_RANGE"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.ACCESSORIES_RANGE"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.ACCESSORIES_RANGE"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.ACCESSORIES_RANGE_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.ACCESSORIES_RANGE === 'good'">
                        {{ (form.ACCESSORIES_RANGE_TOTAL = 3) }}
                      </div>
                      <div v-if="form.ACCESSORIES_RANGE === 'avarage'">
                        {{ (form.ACCESSORIES_RANGE_TOTAL = 2) }}
                      </div>
                      <div v-if="form.ACCESSORIES_RANGE === 'poor'">
                        {{ (form.ACCESSORIES_RANGE_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.ACCESSORIES_RANGE">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.ACCESSORIES_RANGE_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>ACCESSORIES DISPLAY(Cabinets / Lighters / etc)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="ACCESSORIES DISPLAY"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.ACCESSORIES_DISPLAY"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.ACCESSORIES_DISPLAY"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.ACCESSORIES_DISPLAY"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.ACCESSORIES_DISPLAY_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.ACCESSORIES_DISPLAY === 'good'">
                        {{ (form.ACCESSORIES_DISPLAY_TOTAL = 3) }}
                      </div>
                      <div v-if="form.ACCESSORIES_DISPLAY === 'avarage'">
                        {{ (form.ACCESSORIES_DISPLAY_TOTAL = 2) }}
                      </div>
                      <div v-if="form.ACCESSORIES_DISPLAY === 'poor'">
                        {{ (form.ACCESSORIES_DISPLAY_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.ACCESSORIES_DISPLAY">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.ACCESSORIES_DISPLAY_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>ACCESSORIES PRICED / LABELLED</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="ACCESSORIES PRICED"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.ACCESSORIES_PRICED"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.ACCESSORIES_PRICED"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.ACCESSORIES_PRICED"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.ACCESSORIES_PRICED_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.ACCESSORIES_PRICED === 'good'">
                        {{ (form.ACCESSORIES_PRICED_TOTAL = 3) }}
                      </div>
                      <div v-if="form.ACCESSORIES_PRICED === 'avarage'">
                        {{ (form.ACCESSORIES_PRICED_TOTAL = 2) }}
                      </div>
                      <div v-if="form.ACCESSORIES_PRICED === 'poor'">
                        {{ (form.ACCESSORIES_PRICED_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.ACCESSORIES_PRICED">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.ACCESSORIES_PRICED_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5"></td>
                  </tr>

                  <tr>
                    <th>VAPE CATEGORY</th>
                    <th>Score</th>
                    <th>Comment</th>
                    <th>Score_Total</th>
                    <th>Full_Total</th>
                  </tr>
                  <tr>
                    <td>VAPE RANGE(Range managed to meet Consumer Demand)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="VAPE RANGE"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.VAPE_RANGE"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.VAPE_RANGE"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.VAPE_RANGE"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.VAPE_RANGE_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.VAPE_RANGE === 'good'">
                        {{ (form.VAPE_RANGE_TOTAL = 3) }}
                      </div>
                      <div v-if="form.VAPE_RANGE === 'avarage'">
                        {{ (form.VAPE_RANGE_TOTAL = 2) }}
                      </div>
                      <div v-if="form.VAPE_RANGE === 'poor'">
                        {{ (form.VAPE_RANGE_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.VAPE_RANGE">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.VAPE_RANGE_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      VAPE DISPLAY(all Vape Products displayed together in
                      correct sub categories)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="VAPE DISPLAY"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.VAPE_DISPLAY"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.VAPE_DISPLAY"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.VAPE_DISPLAY"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.VAPE_DISPLAY_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.VAPE_DISPLAY === 'good'">
                        {{ (form.VAPE_DISPLAY_TOTAL = 3) }}
                      </div>
                      <div v-if="form.VAPE_DISPLAY === 'avarage'">
                        {{ (form.VAPE_DISPLAY_TOTAL = 2) }}
                      </div>
                      <div v-if="form.VAPE_DISPLAY === 'poor'">
                        {{ (form.VAPE_DISPLAY_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.VAPE_DISPLAY">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.VAPE_DISPLAY_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>VAPE PRICING(Offers)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="VAPE PRICING"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.VAPE_PRICING"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.VAPE_PRICING"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.VAPE_PRICING"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.VAPE_PRICING_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.VAPE_PRICING === 'good'">
                        {{ (form.VAPE_PRICING_TOTAL = 3) }}
                      </div>
                      <div v-if="form.VAPE_PRICING === 'avarage'">
                        {{ (form.VAPE_PRICING_TOTAL = 2) }}
                      </div>
                      <div v-if="form.VAPE_PRICING === 'poor'">
                        {{ (form.VAPE_PRICING_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.VAPE_PRICING">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.VAPE_PRICING_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>VAPE EDUCATION</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="VAPE EDUCATION"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.VAPE_EDUCATION"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.VAPE_EDUCATION"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.VAPE_EDUCATION"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.VAPE_EDUCATION_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.VAPE_EDUCATION === 'good'">
                        {{ (form.VAPE_EDUCATION_TOTAL = 3) }}
                      </div>
                      <div v-if="form.VAPE_EDUCATION === 'avarage'">
                        {{ (form.VAPE_EDUCATION_TOTAL = 2) }}
                      </div>
                      <div v-if="form.VAPE_EDUCATION === 'poor'">
                        {{ (form.VAPE_EDUCATION_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.VAPE_EDUCATION">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.VAPE_EDUCATION_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5"></td>
                  </tr>

                  <tr>
                    <th>CIGAR CATEGORY</th>
                    <th>Score</th>
                    <th>Comment</th>
                    <th>Score_Total</th>
                    <th>Full_Total</th>
                  </tr>
                  <tr>
                    <td>
                      CIGAR DISPLAY(Cigars displayed in Humidor / separate
                      section)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="CIGAR DISPLAY"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.CIGAR_DISPLAY"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CIGAR_DISPLAY"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CIGAR_DISPLAY"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.CIGAR_DISPLAY_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.CIGAR_DISPLAY === 'good'">
                        {{ (form.CIGAR_DISPLAY_TOTAL = 3) }}
                      </div>
                      <div v-if="form.CIGAR_DISPLAY === 'avarage'">
                        {{ (form.CIGAR_DISPLAY_TOTAL = 2) }}
                      </div>
                      <div v-if="form.CIGAR_DISPLAY === 'poor'">
                        {{ (form.CIGAR_DISPLAY_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.CIGAR_DISPLAY">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.CIGAR_DISPLAY_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      CIGAR STOCK MANAGENT(Humidor water topped up weekly)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="CIGAR STOCK MANAGENT"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.CIGAR_STOCK_MANAGENT"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CIGAR_STOCK_MANAGENT"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CIGAR_STOCK_MANAGENT"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.CIGAR_STOCK_MANAGENT_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.CIGAR_STOCK_MANAGENT === 'good'">
                        {{ (form.CIGAR_STOCK_MANAGENT_TOTAL = 3) }}
                      </div>
                      <div v-if="form.CIGAR_STOCK_MANAGENT === 'avarage'">
                        {{ (form.CIGAR_STOCK_MANAGENT_TOTAL = 2) }}
                      </div>
                      <div v-if="form.CIGAR_STOCK_MANAGENT === 'poor'">
                        {{ (form.CIGAR_STOCK_MANAGENT_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.CIGAR_STOCK_MANAGENT">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.CIGAR_STOCK_MANAGENT_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>CIGAR RANGE(Correct range to meet consumer demand)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="CIGAR RANGE"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.CIGAR_RANGE"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CIGAR_RANGE"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CIGAR_RANGE"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.CIGAR_RANGE_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.CIGAR_RANGE === 'good'">
                        {{ (form.CIGAR_RANGE_TOTAL = 3) }}
                      </div>
                      <div v-if="form.CIGAR_RANGE === 'avarage'">
                        {{ (form.CIGAR_RANGE_TOTAL = 2) }}
                      </div>
                      <div v-if="form.CIGAR_RANGE === 'poor'">
                        {{ (form.CIGAR_RANGE_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.CIGAR_RANGE">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.CIGAR_RANGE_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5"></td>
                  </tr>

                  <tr>
                    <th>FMC & RYO CATEGORY</th>
                    <th>Score</th>
                    <th>Comment</th>
                    <th>Score_Total</th>
                    <th>Full_Total</th>
                  </tr>
                  <tr>
                    <td>CABINETS(Cabinets condition)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="CABINETS CONDITION"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.CABINETS_CONDITION"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CABINETS_CONDITION"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CABINETS_CONDITION"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.CABINETS_CONDITION_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.CABINETS_CONDITION === 'good'">
                        {{ (form.CABINETS_CONDITION_TOTAL = 3) }}
                      </div>
                      <div v-if="form.CABINETS_CONDITION === 'avarage'">
                        {{ (form.CABINETS_CONDITION_TOTAL = 2) }}
                      </div>
                      <div v-if="form.CABINETS_CONDITION === 'poor'">
                        {{ (form.CABINETS_CONDITION_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.CABINETS_CONDITION">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.CABINETS_CONDITION_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>CABINETS(Layout and Stock Weight)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="CABINETS LAYOUTS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.CABINETS_LAYOUTS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CABINETS_LAYOUTS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CABINETS_LAYOUTS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.CABINETS_LAYOUTS_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.CABINETS_LAYOUTS === 'good'">
                        {{ (form.CABINETS_LAYOUTS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.CABINETS_LAYOUTS === 'avarage'">
                        {{ (form.CABINETS_LAYOUTS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.CABINETS_LAYOUTS === 'poor'">
                        {{ (form.CABINETS_LAYOUTS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.CABINETS_LAYOUTS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.CABINETS_LAYOUTS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>CABINETS(Labels)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="CABINETS LABELS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.CABINETS_LABELS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CABINETS_LABELS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CABINETS_LABELS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.CABINETS_LABELS_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.CABINETS_LABELS === 'good'">
                        {{ (form.CABINETS_LABELS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.CABINETS_LABELS === 'avarage'">
                        {{ (form.CABINETS_LABELS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.CABINETS_LABELS === 'poor'">
                        {{ (form.CABINETS_LABELS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.CABINETS_LABELS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.CABINETS_LABELS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>LEGISLATION COMPLIANCE(Signage / Display / Range)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="LEGISLATION COMPLIANCE"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.LEGISLATION_COMPLIANCE"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.LEGISLATION_COMPLIANCE"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.LEGISLATION_COMPLIANCE"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.LEGISLATION_COMPLIANCE_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.LEGISLATION_COMPLIANCE === 'good'">
                        {{ (form.LEGISLATION_COMPLIANCE_TOTAL = 3) }}
                      </div>
                      <div v-if="form.LEGISLATION_COMPLIANCE === 'avarage'">
                        {{ (form.LEGISLATION_COMPLIANCE_TOTAL = 2) }}
                      </div>
                      <div v-if="form.LEGISLATION_COMPLIANCE === 'poor'">
                        {{ (form.LEGISLATION_COMPLIANCE_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.LEGISLATION_COMPLIANCE">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.LEGISLATION_COMPLIANCE_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>PRICE BOARD(Layout and Pricing)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="PRICE BOARD"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.PRICE_BOARD"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.PRICE_BOARD"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.PRICE_BOARD"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.PRICE_BOARD_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.PRICE_BOARD === 'good'">
                        {{ (form.PRICE_BOARD_TOTAL = 3) }}
                      </div>
                      <div v-if="form.PRICE_BOARD === 'avarage'">
                        {{ (form.PRICE_BOARD_TOTAL = 2) }}
                      </div>
                      <div v-if="form.PRICE_BOARD === 'poor'">
                        {{ (form.PRICE_BOARD_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.PRICE_BOARD">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.PRICE_BOARD_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>BATA RANGE(Correct Range and Layout)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="BATA RANGE"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.BATA_RANGE"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.BATA_RANGE"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.BATA_RANGE"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.BATA_RANGE_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.BATA_RANGE === 'good'">
                        {{ (form.BATA_RANGE_TOTAL = 3) }}
                      </div>
                      <div v-if="form.BATA_RANGE === 'avarage'">
                        {{ (form.BATA_RANGE_TOTAL = 2) }}
                      </div>
                      <div v-if="form.BATA_RANGE === 'poor'">
                        {{ (form.BATA_RANGE_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.BATA_RANGE">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.BATA_RANGE_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>IBA RANGE(Correct Range and Layout)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="IBA RANGE"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.IBA_RANGE"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.IBA_RANGE"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.IBA_RANGE"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.IBA_RANGE_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.IBA_RANGE === 'good'">
                        {{ (form.IBA_RANGE_TOTAL = 3) }}
                      </div>
                      <div v-if="form.IBA_RANGE === 'avarage'">
                        {{ (form.IBA_RANGE_TOTAL = 2) }}
                      </div>
                      <div v-if="form.IBA_RANGE === 'poor'">
                        {{ (form.IBA_RANGE_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.IBA_RANGE">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.IBA_RANGE_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>PML RANGE(Correct Range and Layout)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="PML RANGE"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.PML_RANGE"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.PML_RANGE"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.PML_RANGE"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.PML_RANGE_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.PML_RANGE === 'good'">
                        {{ (form.PML_RANGE_TOTAL = 3) }}
                      </div>
                      <div v-if="form.PML_RANGE === 'avarage'">
                        {{ (form.PML_RANGE_TOTAL = 2) }}
                      </div>
                      <div v-if="form.PML_RANGE === 'poor'">
                        {{ (form.PML_RANGE_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.PML_RANGE">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.PML_RANGE_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>OTHER RANGE(Correct Range and Layout)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="OTHER RANGE"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.OTHER_RANGE"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.OTHER_RANGE"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.OTHER_RANGE"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.OTHER_RANGE_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.OTHER_RANGE === 'good'">
                        {{ (form.OTHER_RANGE_TOTAL = 3) }}
                      </div>
                      <div v-if="form.OTHER_RANGE === 'avarage'">
                        {{ (form.OTHER_RANGE_TOTAL = 2) }}
                      </div>
                      <div v-if="form.OTHER_RANGE === 'poor'">
                        {{ (form.OTHER_RANGE_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.OTHER_RANGE">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.OTHER_RANGE_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      KEY FOUCUS PRODUCTS(Knowledge of and activation of Key
                      Focus Products)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="KEY FOUCUS PRODUCTS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.KEY_FOUCUS_PRODUCTS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.KEY_FOUCUS_PRODUCTS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.KEY_FOUCUS_PRODUCTS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          v-model="form.KEY_FOUCUS_PRODUCTS_COMMENT"
                          placeholder="Comment"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.KEY_FOUCUS_PRODUCTS === 'good'">
                        {{ (form.KEY_FOUCUS_PRODUCTS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.KEY_FOUCUS_PRODUCTS === 'avarage'">
                        {{ (form.KEY_FOUCUS_PRODUCTS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.KEY_FOUCUS_PRODUCTS === 'poor'">
                        {{ (form.KEY_FOUCUS_PRODUCTS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.KEY_FOUCUS_PRODUCTS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.KEY_FOUCUS_PRODUCTS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      STOCK TAKE COMPLETED(Completed as per process - Daily and
                      Count / Accuracy)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STOCK TAKE COMPLETED"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STOCK_TAKE_COMPLETED"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STOCK_TAKE_COMPLETED"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STOCK_TAKE_COMPLETED"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.STOCK_TAKE_COMPLETED_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STOCK_TAKE_COMPLETED === 'good'">
                        {{ (form.STOCK_TAKE_COMPLETED_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STOCK_TAKE_COMPLETED === 'avarage'">
                        {{ (form.STOCK_TAKE_COMPLETED_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STOCK_TAKE_COMPLETED === 'poor'">
                        {{ (form.STOCK_TAKE_COMPLETED_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STOCK_TAKE_COMPLETED">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.STOCK_TAKE_COMPLETED_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>MIN ORDER QUANTITIES(Updated and Correct)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="MIN ORDER QUANTITIES"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.MIN_ORDER_QUANTITIES"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.MIN_ORDER_QUANTITIES"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.MIN_ORDER_QUANTITIES"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.MIN_ORDER_QUANTITIES_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.MIN_ORDER_QUANTITIES === 'good'">
                        {{ (form.MIN_ORDER_QUANTITIES_TOTAL = 3) }}
                      </div>
                      <div v-if="form.MIN_ORDER_QUANTITIES === 'avarage'">
                        {{ (form.MIN_ORDER_QUANTITIES_TOTAL = 2) }}
                      </div>
                      <div v-if="form.MIN_ORDER_QUANTITIES === 'poor'">
                        {{ (form.MIN_ORDER_QUANTITIES_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.MIN_ORDER_QUANTITIES">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.MIN_ORDER_QUANTITIES_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      STOCK RECEIPT PROCESS(Invoices accessed / printed -
                      checked / escalated)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STOCK RECEIPT PROCESS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STOCK_RECEIPT_PROCESS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STOCK_RECEIPT_PROCESS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STOCK_RECEIPT_PROCESS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.STOCK_RECEIPT_PROCESS_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STOCK_RECEIPT_PROCESS === 'good'">
                        {{ (form.STOCK_RECEIPT_PROCESS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STOCK_RECEIPT_PROCESS === 'avarage'">
                        {{ (form.STOCK_RECEIPT_PROCESS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STOCK_RECEIPT_PROCESS === 'poor'">
                        {{ (form.STOCK_RECEIPT_PROCESS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STOCK_RECEIPT_PROCESS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.STOCK_RECEIPT_PROCESS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      STORE ROOM STOCK WEIGHT(Issues highlighted/addressed)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STORE ROOM STOCK WEIGHT"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STORE_ROOM_STOCK_WEIGHT"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_ROOM_STOCK_WEIGHT"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_ROOM_STOCK_WEIGHT"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.STORE_ROOM_STOCK_WEIGHT_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STORE_ROOM_STOCK_WEIGHT === 'good'">
                        {{ (form.STORE_ROOM_STOCK_WEIGHT_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STORE_ROOM_STOCK_WEIGHT === 'avarage'">
                        {{ (form.STORE_ROOM_STOCK_WEIGHT_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STORE_ROOM_STOCK_WEIGHT === 'poor'">
                        {{ (form.STORE_ROOM_STOCK_WEIGHT_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STORE_ROOM_STOCK_WEIGHT">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL +
                            form.STORE_ROOM_STOCK_WEIGHT_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>STORE ROOM MANAGEMENT(Labels, Rotation / Flow)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STORE ROOM MANAGEMENT"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STORE_ROOM_MANAGEMENT"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_ROOM_MANAGEMENT"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_ROOM_MANAGEMENT"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.STORE_ROOM_MANAGEMENT_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STORE_ROOM_MANAGEMENT === 'good'">
                        {{ (form.STORE_ROOM_MANAGEMENT_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STORE_ROOM_MANAGEMENT === 'avarage'">
                        {{ (form.STORE_ROOM_MANAGEMENT_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STORE_ROOM_MANAGEMENT === 'poor'">
                        {{ (form.STORE_ROOM_MANAGEMENT_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STORE_ROOM_MANAGEMENT">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.STORE_ROOM_MANAGEMENT_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>STORE ROOM DAMAGES(Returns addressed and cleared)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STORE ROOM DAMAGES"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STORE_ROOM_DAMAGES"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_ROOM_DAMAGES"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_ROOM_DAMAGES"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.STORE_ROOM_DAMAGES_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STORE_ROOM_DAMAGES === 'good'">
                        {{ (form.STORE_ROOM_DAMAGES_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STORE_ROOM_DAMAGES === 'avarage'">
                        {{ (form.STORE_ROOM_DAMAGES_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STORE_ROOM_DAMAGES === 'poor'">
                        {{ (form.STORE_ROOM_DAMAGES_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STORE_ROOM_DAMAGES">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.STORE_ROOM_DAMAGES_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5"></td>
                  </tr>

                  <tr>
                    <th>STORE HEALTH - GENERAL & BACK OFFICE</th>
                    <th>Score</th>
                    <th>Comment</th>
                    <th>Score_Total</th>
                    <th>Full_Total</th>
                  </tr>
                  <tr>
                    <td>
                      STORE CLEANLINESS(General - Floors, Windows,Cabinets)
                    </td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STORE CLEANLINESS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STORE_CLEANLINESS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_CLEANLINESS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_CLEANLINESS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.STORE_CLEANLINESS_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STORE_CLEANLINESS === 'good'">
                        {{ (form.STORE_CLEANLINESS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STORE_CLEANLINESS === 'avarage'">
                        {{ (form.STORE_CLEANLINESS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STORE_CLEANLINESS === 'poor'">
                        {{ (form.STORE_CLEANLINESS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STORE_CLEANLINESS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.STORE_CLEANLINESS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>STORE OHS(Trip Hazards, boxes etc)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STORE OHS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STORE_OHS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_OHS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_OHS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.STORE_OHS_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STORE_OHS === 'good'">
                        {{ (form.STORE_OHS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STORE_OHS === 'avarage'">
                        {{ (form.STORE_OHS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STORE_OHS === 'poor'">
                        {{ (form.STORE_OHS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STORE_OHS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.STORE_OHS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>STORE TASKS(Damages / Repairs etc highlighted)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STORE TASKS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STORE_TASKS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_TASKS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_TASKS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.STORE_TASKS_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STORE_TASKS === 'good'">
                        {{ (form.STORE_TASKS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STORE_TASKS === 'avarage'">
                        {{ (form.STORE_TASKS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STORE_TASKS === 'poor'">
                        {{ (form.STORE_TASKS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STORE_TASKS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.STORE_TASKS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>STORE ROOM MANAGEMENT & CLEANLINESS(General)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STORE ROOM MANAGEMENT & CLEANLINESS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STORE_ROOM_MANAGEMENT_GENERAL"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_ROOM_MANAGEMENT_GENERAL"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_ROOM_MANAGEMENT_GENERAL"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.STORE_ROOM_MANAGEMENT_GENERAL_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STORE_ROOM_MANAGEMENT_GENERAL === 'good'">
                        {{ (form.STORE_ROOM_MANAGEMENT_GENERAL_TOTAL = 3) }}
                      </div>
                      <div
                        v-if="form.STORE_ROOM_MANAGEMENT_GENERAL === 'avarage'"
                      >
                        {{ (form.STORE_ROOM_MANAGEMENT_GENERAL_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STORE_ROOM_MANAGEMENT_GENERAL === 'poor'">
                        {{ (form.STORE_ROOM_MANAGEMENT_GENERAL_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STORE_ROOM_MANAGEMENT_GENERAL">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL +
                            form.STORE_ROOM_MANAGEMENT_GENERAL_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="5"></td>
                  </tr>

                  <tr>
                    <th>Retail Operation</th>
                    <th>Score</th>
                    <th>Comment</th>
                    <th>Score_Total</th>
                    <th>Full_Total</th>
                  </tr>
                  <tr>
                    <td>ROSTER</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="ROSTER"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.ROSTER"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.ROSTER"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.ROSTER"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.ROSTER_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.ROSTER === 'good'">
                        {{ (form.ROSTER_TOTAL = 3) }}
                      </div>
                      <div v-if="form.ROSTER === 'avarage'">
                        {{ (form.ROSTER_TOTAL = 2) }}
                      </div>
                      <div v-if="form.ROSTER === 'poor'">
                        {{ (form.ROSTER_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.ROSTER">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.ROSTER_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>ADDITIONAL HOURS</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="ADDITIONAL HOURS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.ADDITIONAL_HOURS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.ADDITIONAL_HOURS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.ADDITIONAL_HOURS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.ADDITIONAL_HOURS_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.ADDITIONAL_HOURS === 'good'">
                        {{ (form.ADDITIONAL_HOURS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.ADDITIONAL_HOURS === 'avarage'">
                        {{ (form.ADDITIONAL_HOURS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.ADDITIONAL_HOURS === 'poor'">
                        {{ (form.ADDITIONAL_HOURS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.ADDITIONAL_HOURS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.ADDITIONAL_HOURS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>CASH VARIANCES</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="CASH VARIANCES"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.CASH_VARIANCES"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CASH_VARIANCES"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CASH_VARIANCES"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.CASH_VARIANCES_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.CASH_VARIANCES === 'good'">
                        {{ (form.CASH_VARIANCES_TOTAL = 3) }}
                      </div>
                      <div v-if="form.CASH_VARIANCES === 'avarage'">
                        {{ (form.CASH_VARIANCES_TOTAL = 2) }}
                      </div>
                      <div v-if="form.CASH_VARIANCES === 'poor'">
                        {{ (form.CASH_VARIANCES_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.CASH_VARIANCES">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.CASH_VARIANCES_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>CUSTOMER COUNT</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="CUSTOMER COUNT"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.CUSTOMER_COUNT"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CUSTOMER_COUNT"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CUSTOMER_COUNT"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.CUSTOMER_COUNT_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.CUSTOMER_COUNT === 'good'">
                        {{ (form.CUSTOMER_COUNT_TOTAL = 3) }}
                      </div>
                      <div v-if="form.CUSTOMER_COUNT === 'avarage'">
                        {{ (form.CUSTOMER_COUNT_TOTAL = 2) }}
                      </div>
                      <div v-if="form.CUSTOMER_COUNT === 'poor'">
                        {{ (form.CUSTOMER_COUNT_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.CUSTOMER_COUNT">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.CUSTOMER_COUNT_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>CASH FLOAT</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="CASH FLOAT"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.CASH_FLOAT"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CASH_FLOAT"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.CASH_FLOAT"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.CASH_FLOAT_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.CASH_FLOAT === 'good'">
                        {{ (form.CASH_FLOAT_TOTAL = 3) }}
                      </div>
                      <div v-if="form.CASH_FLOAT === 'avarage'">
                        {{ (form.CASH_FLOAT_TOTAL = 2) }}
                      </div>
                      <div v-if="form.CASH_FLOAT === 'poor'">
                        {{ (form.CASH_FLOAT_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.CASH_FLOAT">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.CASH_FLOAT_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>BANKING</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="BANKING"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.BANKING"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.BANKING"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.BANKING"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.BANKING_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.BANKING === 'good'">
                        {{ (form.BANKING_TOTAL = 3) }}
                      </div>
                      <div v-if="form.BANKING === 'avarage'">
                        {{ (form.BANKING_TOTAL = 2) }}
                      </div>
                      <div v-if="form.BANKING === 'poor'">
                        {{ (form.BANKING_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.BANKING">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.BANKING_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>DAMAGES / RETURNS</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="DAMAGES / RETURNS"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.DAMAGES_RETURNS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.DAMAGES_RETURNS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.DAMAGES_RETURNS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.DAMAGES_RETURNS_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.DAMAGES_RETURNS === 'good'">
                        {{ (form.DAMAGES_RETURNS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.DAMAGES_RETURNS === 'avarage'">
                        {{ (form.DAMAGES_RETURNS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.DAMAGES_RETURNS === 'poor'">
                        {{ (form.DAMAGES_RETURNS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.DAMAGES_RETURNS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.DAMAGES_RETURNS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>STORE TASKS(Repairs)</td>
                    <td>
                      <b-form-radio-group>
                        <validation-provider
                          #default="{ errors }"
                          name="STORE TASKS(Repairs)"
                          rules="required"
                        >
                          <b-form-radio
                            v-model="form.STORE_TASKS_REPAIRS"
                            name="some-radios"
                            value="good"
                            >Good</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_TASKS_REPAIRS"
                            name="some-radios"
                            value="avarage"
                            >Avarage</b-form-radio
                          >
                          <b-form-radio
                            v-model="form.STORE_TASKS_REPAIRS"
                            name="some-radios"
                            value="poor"
                            >Poor</b-form-radio
                          >
                          <small class="text-danger">{{ errors[0] }}</small>
                        </validation-provider>
                      </b-form-radio-group>
                    </td>
                    <td>
                      <validation-provider
                        #default="{ errors }"
                        name="Comment"
                        rules="required"
                      >
                        <b-form-textarea
                          id="textarea"
                          placeholder="Comment"
                          v-model="form.STORE_TASKS_REPAIRS_COMMENT"
                          rows="3"
                        ></b-form-textarea>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </td>
                    <td>
                      <div v-if="form.STORE_TASKS_REPAIRS === 'good'">
                        {{ (form.STORE_TASKS_REPAIRS_TOTAL = 3) }}
                      </div>
                      <div v-if="form.STORE_TASKS_REPAIRS === 'avarage'">
                        {{ (form.STORE_TASKS_REPAIRS_TOTAL = 2) }}
                      </div>
                      <div v-if="form.STORE_TASKS_REPAIRS === 'poor'">
                        {{ (form.STORE_TASKS_REPAIRS_TOTAL = 1) }}
                      </div>
                    </td>
                    <td>
                      <div v-if="form.STORE_TASKS_REPAIRS">
                        {{
                          (form.FULL_TOTAL =
                            form.FULL_TOTAL + form.STORE_TASKS_REPAIRS_TOTAL)
                        }}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
              <b-row>
                <b-col cols="12">
                  <b-button
                    variant="primary"
                    @click="addAudit()"
                    :disabled="invalid"
                    type="submit"
                    >Submit</b-button
                  >
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </b-card>
      </b-container>
    </div>
  </div>
</template>

<script>
import {
  BContainer,
  BFormInput,
  BRow,
  BCol,
  BFormRadio,
  BFormRadioGroup,
  BFormTextarea,
  BForm,
  BButton,
  BFormGroup,
} from "bootstrap-vue";
import AuditApi from "@/store/modules/audit";
import {
  ValidationProvider,
  ValidationObserver,
} from "vee-validate/dist/vee-validate.full";
import vSelect from "vue-select";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BContainer,
    BFormInput,
    BRow,
    BCol,
    BFormRadio,
    BFormRadioGroup,
    BFormTextarea,
    BForm,
    vSelect,
    BButton,
    BFormGroup,
  },
  data() {
    return {
      form: {},
      stores: [],
      selected: "Select Store",
    };
  },
  async mounted() {
    await this.getStores();
  },
  methods: {
    async addAudit() {
      this.form.STORE_ID = this.selected.storeid;
      if (await this.$refs.AuditValidation.validate()) {
        await AuditApi.addAudit(this.form)
          .then(({ response }) => {
            this.showSuccessMsg();
          })
          .catch(({ response }) => {
            if (response.status == 400) {
              this.showErrorMsg({
                message: response.data.error,
              });
            } else {
              this.showErrorMsg();
            }
          });
      }
    },

    async getStores() {
      const res = await AuditApi.getAllStores();
      this.stores = res.data;
    },
  },
};
</script>
<style>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}
th,
td {
  text-align: left;
  padding: 8px;
}
.moveble {
  overflow-x: auto;
}
</style>
