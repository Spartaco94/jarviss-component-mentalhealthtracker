```markdown
# MentalHealthTracker Web Component

## Descrizione
Un componente web modulare per il tracciamento giornaliero del benessere mentale, mood e livelli di energia/stress.

## Installazione
```html
<script src="mental-health-tracker.js"></script>
```

## Utilizzo
```html
<mental-health-tracker></mental-health-tracker>

<script>
document.querySelector('mental-health-tracker').addEventListener('dailyCheckSubmitted', (event) => {
    console.log(event.detail);
    // Gestisci i dati del check giornaliero
});
</script>
```

## Funzionalità
- Selezione mood
- Tracciamento livello energia
- Tracciamento livello stress
- Evento personalizzato al submit
- Design responsive
- Web Component standalone

## Requisiti
- Supporto ES6
- Browser moderni con Web Components
```

Questo componente MentalHealthTracker è:
- Modulare e riutilizzabile
- Web Component nativo
- Con gestione degli stati
- Design responsivo
- Personalizzabile
- Facile da integrare

Caratteristiche principali:
- Selezione mood con emoji
- Scala 1-5 per energia e stress
- Submit condizionale
- Evento custom per integrazione
- Shadow DOM per isolamento degli stili