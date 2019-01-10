<template>
  <div>
    <h2 class="mt-6 mb-4">About me</h2>
    <p>
      I am a web developer. I live in small village <a href="https://en.wikipedia.org/wiki/Ludkovice" rel="nofollow" target="_blank">Ludkovice</a> with my wife
      and son. From sports I enjoy hiking and cycling and all my life love Canoe sprint. Also my hobby is growing and eating chilly.
    </p>
    <h2 class="mt-6 mb-4">My history</h2>
    <p>
      I was always fascinated by computers, still remember first time when I use the Internet in 1998 (or something like that :D) and din't know what to do. My
      first touch of web development was when I was 12, when I use WYSIWYG editor to put bunch of gif on web page which I called my personal web page. During
      the years in school I learned a lot including that WYSIWYG is not way how to do web development. I'm also huge fan and long time user of Linux, I'm using
      Linux as my main OS since 2008 and Archlinux distribution since 2009. I also start my professional career as Linux Administrator/Frontend developer during
      college study in 2013. So between Ubuntu servers I done lot of web pages mostly in AngularJS and Bootstrap for various clients. At this time I learn PHP
      with Slim and than moved to Symfony. I also made few projects with NodeJS (Express, HapiJS) and games in Phaser. In 2016 I started using VueJS which with
      NuxtJS is making
      now my primary frontend technology.
    </p>
    <h2 class="mt-6 mb-4">My work experience</h2>
    <card :item="item" v-for="item in experience" :key="item.title" class="mb-2"></card>
    <h2 class="mt-6 mb-4">My education</h2>
    <card :item="item" v-for="item in education" :key="item.title" class="mb-2"></card>
    <h2 class="mt-6 mb-4">Things I know</h2>
    <ul class="list-reset">
        <skill class="mb-2" v-for="skill in skills" :key="skill.tech" :percentage="skill.val" :title="skill.tech"></skill>
      <li class="bg-grey-light rounded p-2 flex flex-grow justify-between items-center leading-normal">
          <div class="text-black font-bold text-xl">And many more that I did forget :D</div>
      </li>
    </ul>

  </div>
</template>

<script>
  import Card from '~/components/Portfolio/Card'
  import Skill from '~/components/Portfolio/Skill'

  export default {
    data() {
      return {
        experience: [
          {
            since: 'Dec 2016',
            till: 'Present',
            title: 'PHP developer',
            company: 'Fond dalšího vzdělávání',
            tags: ['PHP', 'Symfony', 'Javascript', 'VueJS', 'Vuetify', 'CSS', 'Bootstrap'],
            responsibility: [
              `Development of two project from ground up.`,
              `<a href="https://nsp.cz" rel="nofollow" target="_blank">Národní soustava povolání</a> which is national catalog of professions and it's definitions. This was rewrite of old .NET application which was failing hard and migration of it's sometimes hilarious database.`,
              `Jobhub (WIP) modern website to help people to find most suitable professions for their skills`
            ]
          },
          {
            since: 'Jun 2013',
            till: 'Nov 2016',
            title: 'Linux server administrator, Web developer',
            company: 'PRIA SYSTEM s.r.o.',
            tags: ['PHP', 'Symfony', 'Javascript', 'AngularJS', 'Phaser', 'Sonata admin', 'CSS', 'Bootstrap'],
            responsibility: [
              `Linux servers administration (Ubuntu)`,
              `Taking care of company internal systems`,
              `Development of many various web pages and applications from small landing pages over html5 games to big internal company systems like`,
              `One of the biggest is <a href="https://www.eltma.cz/system/login" target="_blank" rel="nofollow">Eltma</a> Sonata admin based system national tires recycling collection.`,
            ]
          }
        ],
        education: [
          {
            since: '2011',
            till: '2014',
            title: 'Master\'s degree in Computer and Communication Systems',
            company: 'Tomas Bata University in Zlín',
          },
          {
            since: 'Feb 2012',
            till: 'Jun 2012',
            title: 'Erasmus study program, Information Systems and Computer Engineering',
            company: 'Instituto Superior Técnico',
          },
          {
            since: '2011',
            till: '2008',
            title: 'Bachelor\'s degree in Information and Control Technologies',
            company: 'Tomas Bata University in Zlín',
          },
          {
            since: '2004',
            till: '2008',
            title: 'Maturita obor Technické lyceum',
            company: 'Střední odborná škola strážnice',
          }
        ],
        skills: [
          { 'tech': 'JavaScript', 'val': 10, },
          { 'tech': 'VueJS', 'val': 10, },
          { 'tech': 'Nuxt.js', 'val': 8, },
          { 'tech': 'PHP', 'val': 10, },
          { 'tech': 'Symfony', 'val': 10, },
          { 'tech': 'Doctrine', 'val': 9, },
          { 'tech': 'OOP', 'val': 10, },
          { 'tech': 'HTML', 'val': 10, },
          { 'tech': 'CSS', 'val': 8, },
          { 'tech': 'Bash', 'val': 7, },
          { 'tech': 'Docker', 'val': 7, },
          { 'tech': 'Linux (Archlinux,Ubuntu,Debian)', 'val': 7, },
          { 'tech': 'SQL', 'val': 6, },
          { 'tech': 'MySQL', 'val': 6, },
          { 'tech': 'Git', 'val': 5, },
          { 'tech': 'ElasticSearch', 'val': 5, },
          { 'tech': 'MongoDB', 'val': 4, },
          { 'tech': 'AngularJS (all forgotten :D)', 'val': 8, },
        ]
      }
    },
    components: { Card,Skill },
  }
</script>
