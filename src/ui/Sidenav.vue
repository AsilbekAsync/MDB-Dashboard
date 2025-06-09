<template>
  <Navbar
    :double="true"
    light
    bg="light"
    class="shadow-2"
    style="max-height: 50px !important"
    container
  >
    <NavbarToggler @click="sidebarOpen = !sidebarOpen">
      <span class="sr-only">Toggle naviagtion</span>
    </NavbarToggler>
    <NavbarNav class="d-flex flex-row" right>
      <NavbarItem to="#" class="ms-3 me-lg-0">
        <i class="fas fa-shopping-cart"></i>
      </NavbarItem>
      <NavbarItem class="ms-3 dropdown">
        <Dropdown v-model="dropdown">
          <DropdownToggle tag="a" class="nav-link hidden-arrow" @click="dropdown = !dropdown">
            <i class="fas fa-user"></i>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="#">Profile</DropdownItem>
            <DropdownItem href="#">Settings</DropdownItem>
            <DropdownItem href="#">Log out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarItem>
    </NavbarNav>
  </Navbar>
  <div :class="['sidebar shadow-2', sidebarOpen ? 'sidebar-open' : '']">
    <div class="sidebar-header text-center p-4">
      <h5 class="text-primary">Async's CMS</h5>
    </div>
    <div class="sidebar-body">
      <List small>
        <ListItem
          action
          ripple
          no-border
          :class="['sidebar-link', isCurrent(route.to) ? 'active' : '']"
          v-for="route in routes"
          :key="route.to"
          @click="navigate(route.to)"
        >
          <i :class="[route.icon, 'me-2', isCurrent(route.to) ? 'text-primary' : 'text-muted']"></i>
          <span>{{ route.label }}</span>
        </ListItem>
      </List>
    </div>
  </div>
  <div class="backdrop" @click="sidebarOpen = false" v-if="sidebarOpen"></div>

  <main>
    <slot></slot>
  </main>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  width: 300px;
  height: 100vh;
  z-index: 900;
  transition: left 0.5s;
  user-select: none;
}

.backdrop {
  display: none;
}
main {
  padding: 20px;
  min-height: calc(100vh - 100px);
  margin-left: 300px;
  width: 100%;
  max-width: calc(100% - 300px);
}

@media (max-width: 992px) {
  main {
    padding: 20px;
    min-height: calc(100vh - 100px);
    margin-left: 0;
    width: 100%;
    max-width: 100%;
  }
}

.sidebar-link {
  border-radius: 0 !important;
  padding-left: 20px !important;
  cursor: pointer !important;
}

@media (max-width: 992px) {
  .sidebar {
    left: -100%;
  }

  .sidebar-open {
    left: 0;
  }

  .backdrop {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 850;
  }
}
</style>

<script setup>
import {
  MDBListGroup as List,
  MDBListGroupItem as ListItem,
  MDBNavbar as Navbar,
  MDBNavbarToggler as NavbarToggler,
  MDBNavbarNav as NavbarNav,
  MDBNavbarItem as NavbarItem,
  MDBDropdown as Dropdown,
  MDBDropdownToggle as DropdownToggle,
  MDBDropdownMenu as DropdownMenu,
  MDBDropdownItem as DropdownItem,
} from 'mdb-vue-ui-kit'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const dropdown = ref(false)
const current = ref('/')
const sidebarOpen = ref(false)
const routes = [
  {
    label: 'Dashboard',
    icon: 'fas fa-pie-chart',
    to: '/',
  },
  {
    label: 'Posts',
    icon: 'fas fa-pencil-alt',
    to: '/posts',
  },
  {
    label: 'Users',
    icon: 'fas fa-users',
    to: '/users',
  },
  {
    label: 'Images',
    icon: 'fas fa-image',
    to: '/images',
  },
  {
    label: 'Profile',
    icon: 'fas fa-user',
    to: '/profile',
  },
  {
    label: 'Settings',
    icon: 'fas fa-gear',
    to: '/settings',
  },
]

const isCurrent = (path) => route.path === path
const navigate = (path) => {
  setTimeout(() => {
    router.push(path)
  }, 1000)
}
</script>
