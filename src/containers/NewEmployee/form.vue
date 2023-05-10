<template>
  <div>
    <div class="padding_top_common_medium"></div>
    <div class="padding_employee">
      <b-card>
        <div class="padding_top_common_medium"></div>
        <validation-observer ref="newemployeeValidation" #default="{ invalid }">
          <b-form @submit.prevent>
            <div class="padding_employee_card">
              <b-row>
                <b-col md="6">
                  <h2 class="heading_color"><b>New Employee Form</b></h2>
                </b-col>
                <b-col md="6">
                  <b-form-group
                    label="Store Name"
                    label-class="font-weight-bold store_class"
                    label-for="h-store-name"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Store Name"
                      rules="required"
                    >
                      <b-form-input
                        id="h-store-name"
                        placeholder="Store Name"
                        v-model="form.storename"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>

              <hr />
              <h5 class="form_text">Personal Details</h5>
              <hr />

              <b-row>
                <b-col md="12">
                  <b-form-group
                    label="Given names"
                    label-for="h-given names"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Given names"
                      rules="required"
                    >
                      <b-form-input
                        id="h-given names"
                        placeholder="Given names"
                        v-model="form.givennames"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Surname"
                    label-for="h-surname"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Surname"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Sername"
                        placeholder="Surname"
                        v-model="form.surname"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col cols="12">
                  <b-form-group
                    label="Date Of Birth"
                    label-for="v-Date-of-Birth"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Date Of Birth"
                      rules="required"
                    >
                      <b-form-datepicker
                        id="example-datepicker"
                        class="mb-1"
                        v-model="form.dateofbirth"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Address Suburb & Post Code"
                    label-for="h-address"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Address Suburb & Post Code"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Address"
                        placeholder="Address"
                        v-model="form.address"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Home Phone Number"
                    label-for="v-Home_Phone_Number"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Home Phone Number"
                      rules="required|integer|digits:10"
                    >
                      <b-form-input
                        id="h-Home_Phone_Number"
                        placeholder="Home Phone Number"
                        type="number"
                        v-model="form.home_phone_number"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Mobile Number"
                    label-for="v-Mobile_Number"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Mobile Number"
                      rules="required|integer|digits:10"
                    >
                      <b-form-input
                        id="h-Mobile_Number"
                        v-model="form.mobile_number"
                        type="number"
                        placeholder="Mobile Number"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Email"
                    label-for="v-Email"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Email"
                      rules="required|email"
                    >
                      <b-form-input
                        id="h-Email"
                        placeholder="Email"
                        v-model="form.secondemail"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Next of Kin – Name & Phone"
                    label-for="v-Next_of_Kin_Name_&_Phone"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Next of Kin – Name & Phone"
                      rules="required"
                    >
                      <b-form-input
                        id="h--Next_of_Kin_Name_&_Phone"
                        v-model="form.ext_of_kin_name"
                        placeholder="Next of Kin – Name & Phone"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>
              </b-row>

              <div class="small_padding"></div>
              <h5 class="form_text">Mode of Pay - Main Account</h5>
              <div class="small_padding"></div>
              <hr />
              <b-row>
                <b-col md="12">
                  <b-form-group
                    label="Bank Account Name"
                    label-for="v-bank_account_name"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Bank Account Name"
                      rules="required"
                    >
                      <b-form-input
                        id="h-bank_Account_name"
                        placeholder="Bank Account Name"
                        v-model="form.bank_account_name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group label="BSB" label-for="v-BSB" label-cols-md="4">
                    <validation-provider
                      #default="{ errors }"
                      name="BSB"
                      rules="required|integer|digits:6"
                    >
                      <b-form-input
                        id="h-BSB"
                        placeholder="BSB"
                        v-model="form.bsb"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Account Number"
                    label-for="v_Account Number"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Account Number"
                      rules="required|integer|digits:16"
                    >
                      <b-form-input
                        id="h-bank_Account_number"
                        placeholder="Account Number"
                        type="number"
                        v-model="form.account_number"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Bank"
                    label-for="v_Bank"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Bank"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Bank"
                        placeholder="Bank"
                        v-model="form.bank"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>
              </b-row>
              <div class="small_padding"></div>
              <h5 class="form_text">Tax Details</h5>
              <div class="small_padding"></div>
              <hr />
              <b-row>
                <b-col md="12">
                  <b-form-group
                    label="Tax Details"
                    label-for="v_Tax Details"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Tax Details"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Tax Details"
                        placeholder="Tax Details"
                        v-model="form.tax_details"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="TFN Declaration Date(date signed form)"
                    label-for="v-TFN Declaration Date(date signed form)"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="TFN Declaration Date(date signed form)"
                      rules="required"
                    >
                      <b-form-datepicker
                        id="example-TFN Declaration Date(date signed form)"
                        class="mb-1"
                        v-model="form.tfn_dclaration_date"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Claim the tax-free threshold"
                    label-for="v-Claim the tax-free threshold"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Claim the tax free threshold"
                      rules="required"
                    >
                      <div class="extra_small_padding"></div>
                      <div class="inline_radio">
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some10"
                            value="1"
                            v-model="form.claim_the_tax_free_threshold"
                          >
                            Yes
                          </b-form-radio>
                        </div>
                        &nbsp; &nbsp;
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some167"
                            value="0"
                            v-model="form.claim_the_tax_free_threshold"
                          >
                            No
                          </b-form-radio>
                        </div>
                      </div>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>
                <b-col md="12">
                  <b-form-group
                    label="Australian resident for tax purposes"
                    label-for="v-Australian resident for tax purposes"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Australian resident for tax purposes"
                      rules="required"
                    >
                      <div class="extra_small_padding"></div>
                      <div class="inline_radio">
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some15"
                            value="1"
                            v-model="form.australian_resident_for_tax_purposes"
                          >
                            Yes
                          </b-form-radio>
                        </div>
                        &nbsp; &nbsp;
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some21"
                            value="0"
                            v-model="form.australian_resident_for_tax_purposes"
                          >
                            No
                          </b-form-radio>
                        </div>
                      </div>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>
                <b-col md="12">
                  <b-form-group
                    label="Higher Education Loan Debt (HELP)"
                    label-for="v-Higher Education Loan Debt (HELP)"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Higher Education Loan Debt (HELP)"
                      rules="required"
                    >
                      <div class="extra_small_padding"></div>
                      <div class="inline_radio">
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some180"
                            value="1"
                            v-model="form.higher_education_loan_debt"
                          >
                            Yes
                          </b-form-radio>
                        </div>
                        &nbsp; &nbsp;
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some331"
                            value="0"
                            v-model="form.higher_education_loan_debt"
                          >
                            No
                          </b-form-radio>
                        </div>
                      </div>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>
                <b-col md="12">
                  <b-form-group
                    label="Financial Supplement debt"
                    label-for="v-Financial Supplement debt"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Financial Supplement debt)"
                      rules="required"
                    >
                      <div class="extra_small_padding"></div>
                      <div class="inline_radio">
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some81"
                            value="1"
                            v-model="form.financial_supplement_debt"
                          >
                            Yes
                          </b-form-radio>
                        </div>
                        &nbsp; &nbsp;
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some91"
                            value="0"
                            v-model="form.financial_supplement_debt"
                          >
                            No
                          </b-form-radio>
                        </div>
                      </div>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>
              </b-row>
              <div class="small_padding"></div>
              <h5 class="form_text">Superannuation</h5>
              <div class="small_padding"></div>
              <hr />
              <b-row>
                <b-col md="12">
                  <b-form-group
                    label="Name of Fund"
                    label-for="v_Name of Fund"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Name of Fund"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Name of Fund"
                        placeholder="Name of Fund"
                        v-model="form.name_of_fund"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Name of Account"
                    label-for="v_Name of Account"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Name of Account"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Name of Account"
                        placeholder="Name of Account"
                        v-model="form.name_of_account"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Membership Number"
                    label-for="v_Membership Number"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Membership Number"
                      rules="required|integer"
                    >
                      <b-form-input
                        id="h-Membership Number"
                        type="number"
                        placeholder="Membership Number"
                        v-model="form.membership_number"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Fund ABN + SPIN"
                    label-for="v_Fund ABN + SPIN"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Fund ABN + SPIN"
                      rules="required|integer"
                    >
                      <b-form-input
                        id="h-Fund ABN + SPIN"
                        type="number"
                        placeholder="Fund ABN + SPIN"
                        v-model="form.fund_abn_spin"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Fund BSB + Account Number"
                    label-for="v_Fund BSB + Account Number"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Fund BSB + Account Number"
                      rules="required|integer"
                    >
                      <b-form-input
                        id="h-Fund BSB + Account Number"
                        type="number"
                        placeholder="Fund BSB + Account Number"
                        v-model="form.fund_bsb_account_number"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Fund Contact Details + Tel"
                    label-for="v_ Fund Contact Details + Tel"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Fund Contact Details + Tel"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Fund Contact Details + Tel"
                        placeholder="Fund Contact Details + Tel"
                        v-model="form.fund_contact_details"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>
              </b-row>
              <div class="small_padding"></div>
              <h5 class="form_text">Office Use only: Employment Details</h5>
              <div class="small_padding"></div>
              <hr />
              <b-row>
                <b-col md="12">
                  <b-form-group
                    label="Employee Name"
                    label-for="v_Employee Name"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Employee Name"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Employee Name"
                        placeholder="Employee Name"
                        v-model="form.employee_name"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Position"
                    label-for="v_Position"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Position"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Position"
                        placeholder="Position"
                        v-model="form.position"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Start Date with Company"
                    label-for="v-Start Date with Company"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Start Date with Company"
                      rules="required"
                    >
                      <b-form-datepicker
                        id="example-datepicker"
                        class="mb-1"
                        v-model="form.start_date_with_company"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>
                <b-col md="6">
                  <b-form-group
                    label="Salary p.a. (FT or FTE)"
                    label-for="v_Salary p.a. (FT or FTE)"
                    label-cols-md="8"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Salary p.a. (FT or FTE)"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Salary p.a. (FT or FTE)"
                        type="number"
                        step="0.01"
                        placeholder="Salary p.a. (FT or FTE)"
                        v-model="form.salary"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="6">
                  <b-form-group
                    label="Or Hourly Rate"
                    label-for="v_Hourly Rate"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Or Hourly Rate"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Hourly Rate"
                        placeholder="Hourly Rate"
                        v-model="form.hourly_rate"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="PoModern Award & Classification"
                    label-for="v_Modern Award & Classification"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="PoModern Award & Classification"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Modern Award & Classification"
                        placeholder="Modern Award & Classification"
                        v-model="form.pomodern_award"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Tenure"
                    label-for="v-Tenure"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Tenure"
                      rules="required"
                    >
                      <div class="extra_small_padding"></div>
                      <div class="inline_radio">
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some231"
                            value="Full Time"
                            v-model="form.tenure"
                          >
                            Full Time
                          </b-form-radio>
                        </div>
                        &nbsp; &nbsp;
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some761"
                            value="Part Time"
                            v-model="form.tenure"
                          >
                            Part Time
                          </b-form-radio>
                        </div>
                        &nbsp; &nbsp;
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some198"
                            value="Casual"
                            v-model="form.tenure"
                          >
                            Casual
                          </b-form-radio>
                        </div>
                      </div>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Days per Week + Hours per Day"
                    label-for="v_Days per Week + Hours per Day"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Days per Week + Hours per Day"
                      rules="required|integer"
                    >
                      <b-form-input
                        type="number"
                        id="h-Days per Week + Hours per Day"
                        placeholder="Days per Week + Hours per Day"
                        v-model="form.days_per_week_hours_per_day"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Allowances or Deductions"
                    label-for="v_Allowances or Deductions"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Allowances or Deductions"
                      rules="required"
                    >
                      <b-form-input
                        id="h-Allowances or Deductions"
                        type="number"
                        step="0.01"
                        placeholder="Allowances or Deductions"
                        v-model="form.allowances_or_deductions"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="annum (pro-rata for PT)
Annual leave Accrues per"
                    label-for="v-annum (pro-rata for PT)
Annual leave Accrues per "
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="annum (pro-rata for PT)
Annual leave Accrues per"
                      rules="required"
                    >
                      <div class="extra_small_padding"></div>
                      <div class="inline_radio">
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some891"
                            value="4 weeks"
                            v-model="form.annum_annual_leave_accrues_per"
                          >
                            4 weeks
                          </b-form-radio>
                        </div>
                        &nbsp; &nbsp;
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some90"
                            value="5 weeks"
                            v-model="form.annum_annual_leave_accrues_per"
                          >
                            5 weeks
                          </b-form-radio>
                        </div>
                        &nbsp; &nbsp;
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some165"
                            value="6 weeks"
                            v-model="form.annum_annual_leave_accrues_per"
                          >
                            6 weeks
                          </b-form-radio>
                        </div>
                      </div>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Leave Loading Applicable"
                    label-for="v-Leave Loading Applicable"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Leave Loading Applicable"
                      rules="required"
                    >
                      <div class="extra_small_padding"></div>
                      <div class="inline_radio">
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some981"
                            value="1"
                            v-model="form.leave_loading_applicable"
                          >
                            Yes
                          </b-form-radio>
                        </div>
                        &nbsp; &nbsp;
                        <div class="redio">
                          <b-form-radio
                            plain
                            name="some1272"
                            value="0"
                            v-model="form.leave_loading_applicable"
                          >
                            No
                          </b-form-radio>
                        </div>
                      </div>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col md="12">
                  <b-form-group
                    label="Additional information"
                    label-for="v_Additional information"
                    label-cols-md="4"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Additional information "
                      rules="required"
                    >
                      <b-form-textarea
                        id="h- dditional information "
                        placeholder="Additional information"
                        v-model="form.additional_information"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <hr />
                </b-col>

                <b-col cols="12">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="primary"
                    class="mr-1"
                    :disabled="invalid"
                    @click="AddNewEmployee()"
                  >
                    Submit
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </b-form>
        </validation-observer>
      </b-card>
    </div>
  </div>
</template>

<script>
import Ripple from "vue-ripple-directive";
import {
  BRow,
  BFormDatepicker,
  BCol,
  BCard,
  BFormRadio,
  BButton,
  BFormGroup,
  BFormInput,
  BForm,
  BFormTextarea,
} from "bootstrap-vue";
import {
  ValidationProvider,
  ValidationObserver,
} from "vee-validate/dist/vee-validate.full";
import NewEmployee from "@/store/modules/NewEmployee";
export default {
  data() {
    return {
      form: {},
    };
  },
  components: {
    BRow,
    BForm,
    BFormRadio,
    BFormDatepicker,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    BCard,
    BFormTextarea,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },

  methods: {
    async AddNewEmployee() {
      if (await this.$refs.newemployeeValidation.validate()) {
        await NewEmployee.AddNewEmployee(this.form)
          .then(({ response }) => {
            this.showSuccessMsg();
            // setTimeout(() => {
            //   this.form = {};
            // }, 10000);
          })
          .catch(({ response }) => {
            if (response.status == 400) {
              this.showErrorMsg({
                message: response.data.error,
              });
              // setTimeout(() => {
              //   this.form = {};
              // }, 10000);
            } else {
              this.showErrorMsg();
              // setTimeout(() => {
              //   this.form = {};
              // }, 10000);
            }
          });
      }
    },
  },
};
</script>
