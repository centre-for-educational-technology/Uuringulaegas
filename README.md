Uuringulaegas
=============

Uurimislaegas on veebiportaal, mis koosneb kuuest omavahel integreeritud moodulist: [kasutajahaldus](https://github.com/tammets/Uuringulaegas/issues/1), [uurimistööde repositoorium](https://github.com/tammets/Uuringulaegas/issues/2), [pädevuste hindamismoodul](https://github.com/tammets/Uuringulaegas/issues/3), [suhtlemismoodul](https://github.com/tammets/Uuringulaegas/issues/4), avatud õpimärkide (Open Badges) tehnoloogial põhinev [auhindade moodul](https://github.com/tammets/Uuringulaegas/issues/5) ja [haldusmoodul](https://github.com/tammets/Uuringulaegas/issues/6).

[Portaali esileht](http://lingid.ee/platform_mock_up), [mockup](https://projects.invisionapp.com/share/C81XU69TG#/screens)

Paigaldusjuhend
---------------
* PHP 5.3+
* Wordpress (v 4.4+)
* AngularJS (v1.3.12)

#####Vajalikud moodulid Wordpressile:
  - WP REST API, v1.2.5
  - Pods - Custom Content Types and Fields (v2.6.1)
  - Wordpress Social Login (v2.3.0)
  
    #######Järnevad 3 pluginat tulevad installeerimispakiga kaasa:
    - Ark of Inquiry Authentication and Settings
    - Pods JSON API (samanimelise plugina muudetud versioon)
    - Ark of Inquiry OpenBadges
  
### Installation (in English)

1. Download and unpack the webapp from the production branch to the server
2. Install Wordpress in the same server in a subfolder called '/api'
    1. Set up Wordpress and make sure the Wordpress Address and Site Address under General Settings are pointing to the same /api folder
    2. Set permalinks (Settings > Permalinks) to 'Post name'
    3. Add the following plugins to Wordpress
        * WP REST API, v1.2.5
        * Pods - Custom Content Types and Fields (newest)
        * Wordpress Social Login (newest)
    4. In the Pods plugin, enable the following components (Pods Admin > Components)
        * Advanced Content Types
        * Migrate Packages
        * Roles and Capabilities
        * Table Storage
    5. Import Pods settings from the file 'pods_settings.txt' (Pods Admin -> Migrate Packages -> Import)
    6. Give the site administrator all the new extra capabilities (Pods Admin -> Roles & Capabilities -> Administrator -> Toggle All Capabilities on -> Save)
    7. Make the default new user role 'Learner' (Settings - General) and *disable* the 'Anyone can register' checkbox (this only makes sure noone can make accounts on the API(Wordpress) login screen, account creation from the frontend still works)
    8. Under Settings - Ark of Inquiry Settings upload the corresponding images **TODO check if can be packaged along**
    9. Under OpenBadges Settings follow the instructions on the settings page to fill the two inputs with public and private keys for signing badges for OpenBadges
    10. Import Badges and **TODO import more data?**
    11. Configure Social login plugin
        * Facebook
            1. Go to address https://developers.facebook.com/apps/
                1. Create a new app (type  - Website) 
                    * It's easier to skip the quick start wizard flow after entering the app name and go straight to the dashboard
                2. Go to Settings menu, enter your website in the Site URL input in the Basic tab (like http://arkportal.domain.ee)
                3. In the Settings menu's Advanced tab enter the same URL to the 'Valid OAuth redirect URIs' input (in the Client OAuth Settings block down the page)
                4. Go to the App Review menu and make your app public (from development mode to Live mode)
            2. Go to the Ark platform Wordpress admin page 
                1. Under Settings choose WP Social Login
                2. Enable Facebook integration and copy your App ID and Secret key from the Facebook app dashboard to the plugin
        * Google
            1. Go to address https://console.developers.google.com
                1. Create a new Project (when the popup for project name appears, choose to show advanced options and choose 'europe-west' as the app engine location (assuming you are based in Europe))
                2. In the sidebar click Credentials and then Create credentials (type - OAuth client ID)
                    * Fill on the necessary fields (as the Product logo URL you can put http://*YOUR_DOMAIN*/images/group_logo.png - this is an already existing file on your server)
                3. On the next screen choose Web application as the type
                    1. Put your website domain in the Authorized JavaScript origins field (like 'http://arkportal.domain.ee')
                    2. Place this URL and the Authorized redirect URI (don't change anything but your domain in the beginning of the URL!):
                        * http://*YOUR_DOMAIN*/api/wp-content/plugins/wordpress-social-login/hybridauth/?hauth.done=Google
                    3. You will be given a client ID and a Secret key
            2. Copy these keys to WP Social Login settings under Google (See Facebook step 2.)
3. Make sure the webapp's configuration file ('ng/config.js') has the correct values for 'appBase' and 'apiUrl'. These should be relative Url's to your domain root, if you installed the app straight to the root (ex. sub.mydomain.com/) and not a subfolder then you probably don't have to change these.

Veebilehitsejate tugi
---------------------

Safari, Chrome, Firefox, Opera 15, IE9 ja mobiililehitsejad (Android, Chrome Mobile, iOS Safari)
