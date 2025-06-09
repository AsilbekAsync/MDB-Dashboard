<template>
  <Container class="mt-5" style="max-width: 500px">
    <Card>
      <CardHeader>
        <h5>Reset password</h5>
      </CardHeader>
      <CardBody>
        <p>
          Lost your password? Please enter your username or email address. You will receive a link
          to create a new password via email.
        </p>
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
          <Button type="submit" color="primary">Submit</Button>
        </form>
      </CardBody>
      <CardFooter>
        <div class="d-flex justify-content-center">
          <router-link to="/sign-in">Back to Sign In page</router-link>
        </div>
      </CardFooter>
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
} from 'mdb-vue-ui-kit'
import { reactive } from 'vue'

const form = reactive({
  email: '',
})

const submit = () => {
  alert('Form submited!')
}
</script>
