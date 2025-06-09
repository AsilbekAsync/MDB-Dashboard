<template>
  <Layout>
    <div class="container mb-5">
      <div class="card">
        <div class="card-header">
          <h5>List of users</h5>
        </div>
        <div class="card-body">
          <MDBInput label="Search" v-model="search" wrapper-class="mb-2" />
          <div class="table-responsive" style="display: relative;">
            <table class="table table-hover table-sm" style="max-height: 500px !important;">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Joined at</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="row in users" :key="row.id">
                  <td>{{ row.id }}</td>
                  <td>{{ row.first }}</td>
                  <td>{{ row.last }}</td>
                  <td>{{ row.email }}</td>
                  <td>{{ row.time }}</td>
                  <td>
                    <Dropdown v-model="row.dropdown">
                      <DropdownToggle color="dark" class="hidden-arrow" @click="row.dropdown = !row.dropdown" floating>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href="#" @click="view(row)">
                          <i class="fas fa-eye me-2"></i>
                          <span>View</span>
                        </DropdownItem>
                        <DropdownItem href="#" @click="edit(row)">
                          <i class="fas fa-user-edit me-2"></i>
                          <span>Edit</span>
                        </DropdownItem>
                        <DropdownItem href="#" @click="destroy(row)">
                          <i class="fas fa-trash me-2"></i>
                          <span>Delete</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="loader"></div>
          </div>
        </div>
        <div class="card-footer">
          <Pagination class="justify-content-center">
            <PageNav prev icon />
            <PageItem href="#!">1</PageItem>
            <PageItem href="#!">2</PageItem>
            <PageItem href="#!">3</PageItem>
            <PageNav next icon />
          </Pagination>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import {
  MDBDropdown as Dropdown,
  MDBDropdownMenu as DropdownMenu,
  MDBDropdownToggle as DropdownToggle,
  MDBDropdownItem as DropdownItem,
  MDBPagination as Pagination,
  MDBPageItem as PageItem,
  MDBPageNav as PageNav,
  MDBInput
} from 'mdb-vue-ui-kit';

import Layout from '@/ui/Sidenav.vue'

import { onMounted, ref } from 'vue';

const users = ref([])

onMounted(() => {
  users.value = [
    {
      "id": 1,
      "first": "Richard",
      "last": "Campos",
      "email": "brian39@example.net",
      "time": "2023-02-03 04:26:31"
    },
    {
      "id": 2,
      "first": "Daniel",
      "last": "Hunter",
      "email": "kinglaura@example.com",
      "time": "1972-10-05 08:19:32"
    },
    {
      "id": 3,
      "first": "Ronald",
      "last": "Kelly",
      "email": "josephsmith@example.com",
      "time": "1994-04-21 23:42:01"
    },
    {
      "id": 4,
      "first": "Melinda",
      "last": "Zuniga",
      "email": "clarkedavid@example.net",
      "time": "2018-08-11 09:37:54"
    },
    {
      "id": 5,
      "first": "Samantha",
      "last": "Cole",
      "email": "carlaerickson@example.org",
      "time": "1994-08-03 03:41:28"
    },
    {
      "id": 6,
      "first": "Tristan",
      "last": "Sherman",
      "email": "rochakimberly@example.com",
      "time": "2015-07-23 02:48:16"
    },
    {
      "id": 7,
      "first": "William",
      "last": "Ramos",
      "email": "tiffany55@example.net",
      "time": "1985-05-12 08:12:34"
    },
    {
      "id": 8,
      "first": "Kevin",
      "last": "Coleman",
      "email": "cindykline@example.org",
      "time": "1988-07-18 23:00:44"
    },
    {
      "id": 9,
      "first": "Andrew",
      "last": "Munoz",
      "email": "allenmary@example.net",
      "time": "1971-02-27 14:15:38"
    },
    {
      "id": 10,
      "first": "Kayla",
      "last": "Hanson",
      "email": "yrodriguez@example.net",
      "time": "1975-01-09 09:58:34"
    },
    {
      "id": 11,
      "first": "Ian",
      "last": "Daniels",
      "email": "davisjohn@example.org",
      "time": "1993-01-06 00:00:24"
    },
    {
      "id": 12,
      "first": "Joe",
      "last": "Hall",
      "email": "dylan05@example.net",
      "time": "2016-10-21 09:32:15"
    },
    {
      "id": 13,
      "first": "Diana",
      "last": "Gordon",
      "email": "btorres@example.org",
      "time": "2015-08-04 13:31:26"
    },
    {
      "id": 14,
      "first": "Jennifer",
      "last": "Benson",
      "email": "vfinley@example.org",
      "time": "1974-02-10 07:13:01"
    },
    {
      "id": 15,
      "first": "Jennifer",
      "last": "Rodriguez",
      "email": "josephwilliam@example.net",
      "time": "2016-02-18 19:52:49"
    },
    {
      "id": 16,
      "first": "Sheri",
      "last": "Walker",
      "email": "laura22@example.net",
      "time": "2024-08-27 04:41:12"
    },
    {
      "id": 17,
      "first": "Darrell",
      "last": "Nguyen",
      "email": "phillipszachary@example.com",
      "time": "2018-08-06 00:43:46"
    },
    {
      "id": 18,
      "first": "Robert",
      "last": "Banks",
      "email": "kennethhernandez@example.net",
      "time": "2012-11-25 15:45:52"
    },
    {
      "id": 19,
      "first": "Shelby",
      "last": "Carey",
      "email": "lancehawkins@example.net",
      "time": "2003-01-02 19:52:41"
    },
    {
      "id": 20,
      "first": "Juan",
      "last": "Kelley",
      "email": "jacobsonhunter@example.com",
      "time": "1970-03-09 21:11:04"
    },
    {
      "id": 21,
      "first": "Michael",
      "last": "Mcclure",
      "email": "qbenjamin@example.org",
      "time": "1975-02-13 09:57:07"
    },
    {
      "id": 22,
      "first": "Randy",
      "last": "Perkins",
      "email": "mcbridechristopher@example.com",
      "time": "2023-07-13 02:58:18"
    },
    {
      "id": 23,
      "first": "Richard",
      "last": "Schroeder",
      "email": "jessica94@example.com",
      "time": "2023-02-04 04:30:13"
    },
    {
      "id": 24,
      "first": "Samantha",
      "last": "Sanders",
      "email": "jennyleon@example.com",
      "time": "1977-04-24 13:34:44"
    },
    {
      "id": 25,
      "first": "Donald",
      "last": "Stewart",
      "email": "thompsonjohn@example.org",
      "time": "1996-09-12 07:47:28"
    },
  ].filter((row) => row.id <= 10)
    .map(element => {
      element.dropdown = false
      return element
    })

})


const destroy = () => alert('Destroyed')
const view = () => confirm('Are you sure?')
const edit = () => alert('Edited')
</script>


<style scoped>
thead tr th,
tbody tr td {
  text-wrap: nowrap;
}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--mdb-primary);
  margin-left: 5px;
  margin-right: 5px;
  animation: animate 2s linear infinite;
}

@keyframes animate {
  0% {
    width: 0;
    left: 0;
  }

  100% {
    width: 100%;
    left: 100%;
  }
}
</style>