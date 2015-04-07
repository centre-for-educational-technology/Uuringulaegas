Uuringulaegas
=============

Uurimislaegas on veebiportaal, mis koosneb kuuest omavahel integreeritud moodulist: [kasutajahaldus](https://github.com/tammets/Uuringulaegas/issues/1), [uurimistööde repositoorium](https://github.com/tammets/Uuringulaegas/issues/2), [pädevuste hindamismoodul](https://github.com/tammets/Uuringulaegas/issues/3), [suhtlemismoodul](https://github.com/tammets/Uuringulaegas/issues/4), avatud õpimärkide (Open Badges) tehnoloogial põhinev [auhindade moodul](https://github.com/tammets/Uuringulaegas/issues/5) ja [haldusmoodul](https://github.com/tammets/Uuringulaegas/issues/6).

[Portaali esileht](http://lingid.ee/platform_mock_up), [mockup](https://projects.invisionapp.com/share/C81XU69TG#/screens)

Paigaldusjuhend
---------------
* PHP 5.3+
* Wordpress (v 4.1.1)
* Twitter Bootstrap
* jQuery
* Underscore.js
* AngularJS (v1.3.12)
  * ngRoute
  * ngResource
  * ngAria

#####Lisamoodulid AngularJS'ile:
  * AngularUI UI-Bootstrap
  * ngTagsInput
  * angular-rangeslider (?)
  * angular-scroll
  * angular-jqcloud

#####Vajalikud moodulid Wordpressile:
  - JSON REST API, v1.1.1
  - JSON Basic Authentication, v0.1 (ajutiselt arenduse jaoks, hiljem asendub see mõne teise autentimisviisiga)
  - Pods - Custom Content Types and Fields - v2.5.1.2
  - Pods JSON API - v0.2.3 (where-fix branch - [Github](https://github.com/pods-framework/pods-json-api/tree/where-fix)
  
###Installeerimine

1. Laadida alla pakendatud rakendus (git kloon)
2. Pakkida lahti 'app' kaust soovitud asukohta serveris
3. Installeerida Wordpress eraldi alamkausta serveris (näiteks /api/ või /wp/)
  1. Seadistada permalingid kujule 'Post-name' (Settings -> Permalinks)
  2. Lisada WP pluginad
    1. Pods pluginal lülitada sisse järgnevad komponendid (Pods Admin -> Components):
      * Advanced Content Types
      * Migrate Packages
      * Roles and Capabilities
      * Table Storage
    2. Pods pluginale importida sätted pakendatud rakendusega kaasas olnud failist pods_settings.txt (Pods Admin -> Migrate Packages -> Import)
    3. Anda WP Administraatorkasutajale kõik uued lisaõigused (Pods Admin -> Roles & Capabilities -> Administrator -> Toggle All Capabilities on -> Save)
4. Rakenduse failis ng/config.js muuta 'appBase' ja 'apiUrl' väärtused vastavusse serveriga
