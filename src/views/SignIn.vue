<template>
  <Container class="mt-5" style="max-width: 500px">
    <Card>
      <CardHeader>
        <h5 class="text-primary">Sign In</h5>
      </CardHeader>
      <CardBody>
        <form @submit.prevent="submit">
          <Field
            type="text"
            label="Username"
            id="username"
            v-model="form.username"
            wrapperClass="mb-4"
            minlength="5"
            :maxlength="20"
            counter
            autocomplete="off"
            required
          />
          <Field
            type="password"
            label="Password"
            id="password"
            v-model="form.password"
            wrapperClass="mb-4"
            required
          />
          <MDBRow class="mb-2">
            <MDBCol class="d-flex justify-content-start">
              <MDBCheckbox
                label="Remember me"
                id="remember"
                v-model="form.remember"
                wrapperClass="mb-3 mb-md-0"
              />
            </MDBCol>
            <MDBCol>
              <RouterLink to="/forgot">Forgot password?</RouterLink>
            </MDBCol>
          </MDBRow>
          <Button type="submit" color="primary">Submit</Button>
        </form>
      </CardBody>
    </Card>
  </Container>
</template>

<script setup>
import {
  MDBContainer as Container,
  MDBInput as Field,
  MDBCard as Card,
  MDBCardHeader as CardHeader,
  MDBCardBody as CardBody,
  MDBCardFooter as CardFooter,
  MDBBtn as Button,
  MDBCol,
  MDBRow,
  MDBCheckbox,
} from 'mdb-vue-ui-kit'
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  username: '',
  password: '',
  remember: false,
})

const submit = () => {
  alert('Form submited!')
  router.push('/')
}
</script>
