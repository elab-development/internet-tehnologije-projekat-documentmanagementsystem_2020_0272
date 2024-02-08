# INSTALACIJA
Kako biste pokrenuli ovu aplikaciju na vasem racunaru, potrebno je instalirati 

VS CODE, XAMPP, COMPOSER, NODE JS, 

# POKRETANJE APLIKACIJE
 ## Laravel 
 
    cd dmsapi
    composer install 
    cp .env.example .env
    php artisan key:generate
    php artisan migrate:fresh --seed    
    php artisan serve 
 ## React
     cd dmsreact
     npm install
     npm start
# OPIS APLIKACIJE 
Ova aplikacija je dizajnirana kao platforma za upravljanje dokumentima, pružajući funkcionalnosti za kreiranje, čuvanje, ažuriranje i brisanje dokumenata. Korisnici mogu pretraživati dokumente koristeći različite filtere poput naslova, sadržaja, autora, kategorija i tagova, a takođe imaju mogućnost preuzimanja dokumenata. Pored upravljanja dokumentima, aplikacija podržava kreiranje i upravljanje korisničkim nalogom, uključujući registraciju, prijavljivanje, odjavljivanje.  
