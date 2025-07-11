**La syntaxe est composée d'un mot-clef, de 2 caractères suivis d'un : puis suivi des arguments de la recherche.**
**Les champs entre [ ] sont optionnels**

### Rechercher une adresse
**ad**: [*numero*] [*type-voie*] *nom-voie* [*commune*]
Exemle:
- **ad**:*rue carnot*
- **ad**:*77 carnot*
- **ad**:*77 carnot suresnes*
NB: Pour un résultat plus précis, la requête doit contenir au moins deux mots, i.e. rue carnot ou 32 carnot

### Rechercher un contact client
**cc**: [*nom du contact*]@*adresse*
Le champ *adresse* est du même format que pour la recherche d'adresse. **Le charactère *@* est obligatoire**
Exemle:
  - **cc**:@*carnot suresnes *
    Donne tous les contacts rattachés aux clients se trouvant sur voies *Carnot* (rue, avenue, etc) à *Suresens*
  - **cc**:*abel*@*carnot suresnes*
    Donne tous les contacts dont le nom contient *abel* et qui sont rattachés aux clients se trouvant sur voies *Carnot* (rue, avenue, etc) à *Suresens*

### Rechercher un chantier
**ch**:*adresse*
Même syntaxe que pour la recherche d'adresse 
Exemple:
  -*ch*:*carnot suresnes*

### Rechercher un client
**cl**:[nom]@*adresse*
Même syntaxe que pour la recherche d'un contact client
Exemple:
  -*cl*:*imax*@*carnot suresnes*

### Rechercher un contact chantier
**cs**: [nom]@*adresse*
Même syntaxe que pour la recherche d'un contact client
Exemple:
  -**cs**:*pers*@*carnot suresnes*

### Rechercher un devis
**de**: [nom du client]@*adresse*
Même syntaxe que pour la recherche d'un contact client
Exemple:
  -**de**:*imax*@*29 carnot*
  Donne la liste des devis établis à *imax* don't l'adresse est au *29 rue Carnot*. Le résultat montre le devis et le chantier associé (dans la partie gauche)

### Rechercher une facture
**fa**: [nom du client]@*adresse*
Même syntaxe que pour la recherche d'un devis
Exemple:
  -**fa**:*imax*@*29 carnot*
  Donne la liste des devis établis à *imax* don't l'adresse est au *29 rue Carnot*

### Rechercher une mission
**mi**: [description de la mission]@*adresse*
Exemple:
  -**mi**:*horloge*@*106 rue carnot*
  Donne la liste des missions au 106 rue carnot en relation avec le mot horloge
  
