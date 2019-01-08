<template>
  <div class="font-source-sans font-normal text-black leading-normal min-h-screen">
    <div class="flex flex-col w-full fixed pin-l pin-y">
      <nav class="flex items-center justify-between flex-wrap bg-black p-2">
        <div class="w-full max-w-screen-xl relative container mx-auto px-2">
          <div class="flex items-center -mx-6">
            <div class="lg:w-2/4 xl:w-2/5 pl-6 pr-6 lg:pr-8 text-white">
              <!--<svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>-->
              <span class="font-semibold text-xl tracking-tight">Martin Zajíc [Symfony/VueJS developer] </span>
            </div>
            <div class="flex flex-grow items-end lg:w-2/4 xl:w-3/5">

              <div id="sidebar-open" class="flex ml-auto px-6 items-center lg:hidden hidden">
                <svg class="fill-current w-4 h-4 cursor-pointer text-grey" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
              </div>
              <div id="sidebar-close" class="flex ml-auto px-6 items-center lg:hidden">
                <svg class="fill-current w-4 h-4 cursor-pointer text-grey" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path
                    d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
                </svg>
              </div>


              <div class="hidden lg:block ml-auto px-6">
                <div class="flex justify-end items-center text-white">
                  <nuxt-link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-grey mr-4">
                    About me
                  </nuxt-link>
                  <nuxt-link to="/blog" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-grey mr-4">
                    Blog
                  </nuxt-link>
                  <a class="text-white block flex items-center hover:text-grey-darker mr-4" href="https://twitter.com/zajca">
                    <svg role="img" class="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Twitter</title>
                      <path
                        d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84"></path>
                    </svg>
                  </a>
                  <a class="text-white block flex items-center hover:text-grey-darker mr-4" href="https://github.com/zajca">
                    <svg role="img" class="fill-current w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                  <a class="text-white block flex items-center hover:text-grey-darker" href="https://linkedin.com/in/zajca">
                    <svg role="img" class="fill-current w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div class="px-4 pt-4 flex-1 overflow-y-scroll">
        <div class="container mx-auto" style="height: 1000px;">
            <nuxt/>
        </div>
      </div>
      <footer class='w-full text-center border-t border-grey p-4 pin-b'>
        &copy;2019 Martin Zajíc
      </footer>
    </div>
  </div>
</template>
 
<script>
  export default {
    head: {
      bodyAttrs: {
        class: 'bg-grey antialiased'
      }
    }
  }
</script>

<style>
  html {
    background-color: config('colors.white');
    font-family: config('fonts.sans');
  }
</style>
