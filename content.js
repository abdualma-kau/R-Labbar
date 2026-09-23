const course = {
  "labs": {
    "descriptive": {
      "number": "01",
      "title": "Deskriptiv statistik i R",
      "short": "Data, mått och grafer",
      "file": "Tallsådd.xlsx",
      "fileUrl": "Tallsådd.xlsx",
      "lede": "Lär dig att läsa ett datamaterial och beskriva det med enkla mått, tabeller och grafer.",
      "hero": "Från dataimport till en tydlig beskrivning",
      "copy": "Vi undersöker tallplantor som fått vatten med fem olika saltkoncentrationer. Målet är att se nivå, spridning, form och skillnader mellan grupper.",
      "tags": [
        "25 observationer",
        "Y = grodda plantor",
        "B = behandling"
      ],
      "quick": [
        "Kontrollera alltid data innan du räknar.",
        "Ett medelvärde räcker inte för att beskriva spridning.",
        "Välj graf efter den fråga du vill besvara."
      ],
      "steps": [
        {
          "title": "Importera och kontrollera data",
          "purpose": "Först vill vi veta att data har kommit in rätt. Kontrollera de första raderna, variabeltyperna och en snabb sammanfattning.",
          "code": "# I RStudio: Environment → Import Dataset → From Excel...\n# Välj Tallsådd.xlsx och döp dataobjektet till Tallsådd\nhead(Tallsådd)\nstr(Tallsådd)\nsummary(Tallsådd)",
          "output": "# A tibble: 6 × 3\n      Y     B     A\n  <dbl> <dbl> <dbl>\n1   100     1     1\n2   111     1     2\n3   113     1     3\n4    91     1     4\n5    74     1     5\n6   108     2     1\n\n# Y är numerisk. B och A är gruppkoder.\n# Det finns 25 observationer.",
          "interpretation": "<strong>Så läser du detta:</strong> Y är resultatvariabeln, B är behandlingsgruppen och A är raden i försöket. Innan du tolkar något måste du veta vad varje kolumn betyder.",
          "note": "Importera data direkt i RStudio: öppna panelen Environment, välj Import Dataset och sedan From Excel. Välj Tallsådd.xlsx och kontrollera att dataobjektet heter Tallsådd.",
          "quiz": {
            "q": "Vad är Y i detta försök?",
            "options": [
              "Antal grodda tallplantor efter 30 dygn",
              "Saltkoncentrationen",
              "Radnumret i försöket"
            ],
            "answer": 0,
            "explain": "Rätt. Y är resultatet som ska beskrivas."
          },
          "table": [
            [
              "Y",
              "B",
              "A"
            ],
            [
              "100",
              "1",
              "1"
            ],
            [
              "111",
              "1",
              "2"
            ],
            [
              "113",
              "1",
              "3"
            ],
            [
              "91",
              "1",
              "4"
            ],
            [
              "74",
              "1",
              "5"
            ]
          ],
          "practice": "Kontrollera med nrow(Tallsådd) att du har 25 rader. Vad får du med names(Tallsådd)?"
        },
        {
          "title": "Beräkna läges- och spridningsmått",
          "purpose": "Nu beskriver vi hela materialet med mått för centrum och spridning. Kör gärna ett kommando i taget och läs vad varje resultat betyder.",
          "code": "mean(Tallsådd$Y)\nvar(Tallsådd$Y)\nsd(Tallsådd$Y)\nmedian(Tallsådd$Y)\nquantile(Tallsådd$Y)\nIQR(Tallsådd$Y)",
          "output": "mean(Y)       120.32\nvar(Y)        256.2267\nsd(Y)          16.00708\nmedian(Y)     125\nquantile(Y)    0%  25%  50%  75%  100%\n               74  112  125  129  149\nIQR(Y)         17",
          "interpretation": "<strong>Tolkning:</strong> Antalet grodda plantor är i genomsnitt 120,32. Medianen är 125, vilket betyder att hälften av observationerna är högst 125 och hälften minst 125. Standardavvikelsen är ungefär 16 plantor.",
          "note": "Varians är standardavvikelsen i kvadrat. I en vanlig rapport är standardavvikelsen oftast lättare att tolka eftersom den har samma enhet som Y.",
          "quiz": {
            "q": "Vilket mått beskriver ungefärlig typisk spridning i samma enhet som Y?",
            "options": [
              "Varians",
              "Standardavvikelse",
              "Median"
            ],
            "answer": 1,
            "explain": "Rätt. Standardavvikelsen mäts i plantor, precis som Y."
          },
          "practice": "Vilket mått påverkas mest om det högsta värdet blir mycket större: medelvärde eller median?"
        },
        {
          "title": "Jämför grupper med aggregate()",
          "purpose": "B innehåller fem behandlingsgrupper. Vi beräknar samma mått separat för varje nivå av B.",
          "code": "aggregate(Y ~ B, data = Tallsådd, FUN = mean)\naggregate(Y ~ B, data = Tallsådd, FUN = sd)\naggregate(Y ~ B, data = Tallsådd, FUN = median)",
          "output": "  B     Y\n1 1  97.8\n2 2 119.8\n3 3 128.6\n4 4 128.2\n5 5 127.2\n\nHär visas resultatet från mean().\nDe andra kommandona ger sd och median per grupp.",
          "interpretation": "<strong>Tolkning:</strong> Grupp 1 har lägst medelvärde, 97,8. Grupp 3 har högst medelvärde, 128,6. Skillnaden mellan grupp 1 och grupp 3 är cirka 30,8 plantor. För en seriös slutsats bör du också titta på spridning och grafer.",
          "chart": "means",
          "quiz": {
            "q": "Vilken grupp har högst medelvärde i detta material?",
            "options": [
              "B = 1",
              "B = 3",
              "B = 5"
            ],
            "answer": 1,
            "explain": "Rätt. B = 3 har medelvärdet 128,6."
          },
          "practice": "Kör kommandot för sd. Vilken grupp har störst spridning?"
        },
        {
          "title": "Se fördelningen med histogram",
          "purpose": "Ett histogram visar hur observationerna ligger fördelade. Här kan du se om värdena samlas, sprids eller har ovanliga värden.",
          "code": "hist(Tallsådd$Y,\n     breaks = c(70, 90, 110, 130, 150),\n     xaxp = c(70, 150, 4),\n     main = \"Antal grodda tallplantor\",\n     xlab = \"Y\", ylab = \"Frekvens\")",
          "output": "# Ett histogram visas i Plots-fönstret.\n# Klassgränserna är 70, 90, 110, 130 och 150.",
          "interpretation": "<strong>Tolkning:</strong> Histogrammet hjälper dig att se fördelningens form. Det låga värdet 74 och det höga värdet 149 ligger i varsin ytterkant. Använd grafen tillsammans med medelvärde och median.",
          "chart": "hist",
          "practice": "Byt breaks till 5. Beskriv vad som förändras och vad som är oförändrat."
        },
        {
          "title": "Jämför grupper med boxplot",
          "purpose": "Boxploten sammanfattar median, kvartiler och möjliga avvikande observationer. Den är särskilt användbar när grupper ska jämföras visuellt.",
          "code": "boxplot(Y ~ B, data = Tallsådd,\n        xlab = \"Behandlingsgrupp B\",\n        ylab = \"Antal grodda plantor\",\n        main = \"Y uppdelat på B\")",
          "output": "# En boxplot med fem grupper visas.\n# Median, kvartiler och eventuella avvikare\n# kan jämföras mellan grupperna.",
          "interpretation": "<strong>Tolkning:</strong> Grupp 1 ligger tydligt lägre än grupperna 2–5. Boxploten visar också att en grupp kan ha högre eller lägre spridning även när medelvärdena är lika.",
          "chart": "box",
          "practice": "Jämför grupperna B = 3 och B = 4. Har de samma median?"
        },
        {
          "title": "Undersök samband och tabeller",
          "purpose": "A och B är gruppkoder. Du kan undersöka hur observationer ligger på försöksraderna och skapa frekvenstabeller för kategorier.",
          "code": "plot(jitter(Tallsådd$B), Tallsådd$Y,\n     xlab = \"Behandlingsgrupp B\", ylab = \"Y\")\n\ntable(Tallsådd$A)\ntable(Tallsådd$B)\nplot(ecdf(Tallsådd$Y),\n     main = \"Empirisk fördelningsfunktion\")",
          "output": "table(A)\nA\n1 2 3 4 5\n5 5 5 5 5\n\ntable(B)\nB\n1 2 3 4 5\n5 5 5 5 5",
          "interpretation": "<strong>Läs gruppkoder som kategorier.</strong> B anger behandling. Avståndet mellan koderna behöver inte motsvara lika stora dossteg. Därför jämför vi grupper utan att anpassa en regressionslinje. jitter() flyttar punkterna lite i sidled så att överlapp syns. En empirisk fördelningsfunktion visar andelen observationer som är högst ett visst värde.",
          "note": "Valfritt med ggplot2: kör install.packages(\"ggplot2\"), följt av library(ggplot2). Sedan kan du använda ggplot(Tallsådd, aes(x = factor(B), y = Y)) + geom_point() + facet_wrap(~A).",
          "quiz": {
            "q": "Vilken graf är mest direkt lämpad för att jämföra spridning mellan grupper?",
            "options": [
              "Boxplot per grupp",
              "Enbart ett histogram för alla data",
              "Ett stapeldiagram av A"
            ],
            "answer": 0,
            "explain": "Rätt. Boxploten visar median, kvartiler och möjlig spridning för varje grupp."
          },
          "practice": "Vad betyder höjden på den empiriska fördelningsfunktionen vid Y = 125?"
        },
        {
          "title": "Sammanfatta med rätt arbetsordning",
          "purpose": "En statistisk beskrivning blir tydligare när du kopplar varje resultat till en fråga.",
          "code": "# 1. Kontrollera\nhead(Tallsådd); str(Tallsådd); summary(Tallsådd)\n\n# 2. Sammanfatta\nmean(Tallsådd$Y); sd(Tallsådd$Y); median(Tallsådd$Y)\naggregate(Y ~ B, data = Tallsådd, FUN = mean)\n\n# 3. Visualisera\nboxplot(Y ~ B, data = Tallsådd)\nhist(Tallsådd$Y)\n\n# 4. Tolka\n# Beskriv centrum, spridning, form och gruppskillnader.",
          "output": "En bra slutsats nämner:\n• nivå: medelvärde eller median\n• spridning: sd eller IQR\n• form: histogram eller boxplot\n• grupper: skillnader och möjliga begränsningar",
          "interpretation": "<strong>Exempel på slutsats:</strong> Grupp 1 hade klart lägst antal grodda plantor, medan grupperna 3–5 låg högre och ganska nära varandra. Hela materialets medelvärde var 120,32 och standardavvikelsen 16,01. Detta är en beskrivning av materialet, inte automatiskt ett bevis på en kausal effekt.",
          "practice": "Skriv tre meningar om nivå, spridning och skillnader mellan grupper."
        }
      ]
    },
    "regression": {
      "number": "02",
      "title": "Enkel linjär regression i R",
      "short": "Samband och modell",
      "file": "Längder.xlsx",
      "fileUrl": "Längder.xlsx",
      "lede": "Lär dig att anpassa en rät linje, tolka koefficienter och kontrollera om modellen är rimlig.",
      "hero": "Från spridningsdiagram till regressionslinje",
      "copy": "Vi undersöker sambandet mellan en persons längd och fotlängd. Modellen hjälper oss att beskriva sambandet och göra försiktiga förutsägelser.",
      "tags": [
        "200 personer",
        "x = Längd_cm",
        "y = Fotlängd_cm"
      ],
      "quick": [
        "Börja alltid med ett spridningsdiagram.",
        "Lutningen beskriver förändringen i y när x ökar en enhet.",
        "R² beskriver hur mycket av variationen i y som modellen förklarar."
      ],
      "steps": [
        {
          "title": "Importera och kontrollera data",
          "purpose": "Kontrollera att variablerna har rätt namn och rätt typ innan du anpassar en modell.",
          "code": "# I RStudio: Environment → Import Dataset → From Excel...\n# Välj Längder.xlsx och döp dataobjektet till Längder\nhead(Längder)\nstr(Längder)\nsummary(Längder)",
          "output": "# A tibble: 6 × 3\n  Längd_cm Kön    Fotlängd_cm\n     179.0 Man          26.1\n     178.8 Man          26.8\n     179.2 Man          26.7\n     184.9 Man          27.4\n     179.1 Man          25.4\n     169.5 Man          24.0\n\n# 200 observationer: 100 kvinnor och 100 män.",
          "interpretation": "<strong>Rollerna i modellen:</strong> Längd_cm är den oberoende variabeln x. Fotlängd_cm är den beroende variabeln y. Kön är en gruppvariabel som vi senare använder för jämförelse.",
          "table": [
            [
              "Längd_cm",
              "Kön",
              "Fotlängd_cm"
            ],
            [
              "179.0",
              "Man",
              "26.1"
            ],
            [
              "178.8",
              "Man",
              "26.8"
            ],
            [
              "179.2",
              "Man",
              "26.7"
            ],
            [
              "184.9",
              "Man",
              "27.4"
            ],
            [
              "179.1",
              "Man",
              "25.4"
            ]
          ],
          "note": "Importera data direkt i RStudio: öppna panelen Environment, välj Import Dataset och sedan From Excel. Välj Längder.xlsx och kontrollera att dataobjektet heter Längder.",
          "practice": "Kontrollera antalet personer med nrow(Längder) och gruppstorlekarna med table(Längder$Kön)."
        },
        {
          "title": "Anpassa en rät linje",
          "purpose": "Börja med ett spridningsdiagram. lm() skattar sedan en linje för den förväntade fotlängden: ŷ = b₀ + b₁x. Spara modellen som resultat och lägg linjen i diagrammet.",
          "code": "plot(Fotlängd_cm ~ Längd_cm, data = Längder,\n     xlab = \"Kroppslängd (cm)\",\n     ylab = \"Fotlängd (cm)\")\n\nresultat <- lm(Fotlängd_cm ~ Längd_cm,\n               data = Längder)\nabline(resultat, col = \"darkgreen\", lwd = 2)\nsummary(resultat)",
          "output": "Call:\nlm(formula = Fotlängd_cm ~ Längd_cm, data = Längder)\n\nCoefficients:\n (Intercept)     Längd_cm\n     -1.2416       0.1567\n\nMultiple R-squared: 0.7303\n\nLinjens ekvation:\nFotlängd_cm = -1.24 + 0.157 · Längd_cm",
          "interpretation": "<strong>Tolkning:</strong> När längden ökar med 1 cm ökar den förväntade fotlängden enligt modellen med cirka 0,157 cm. Interceptet är modellens beräknade fotlängd när längden är 0 cm, vilket inte är meningsfullt i den här situationen men behövs matematiskt för linjen.",
          "chart": "scatter",
          "quiz": {
            "q": "Vad beskriver lutningen 0,1567?",
            "options": [
              "Förväntad förändring i fotlängd när längden ökar 1 cm",
              "Medelvärdet av alla fotlängder",
              "Antalet personer i datamaterialet"
            ],
            "answer": 0,
            "explain": "Rätt. Lutningen är modellens förändring i y per enhet x."
          },
          "practice": "Hur mycket ändras den förväntade fotlängden när kroppslängden ökar med 10 cm?"
        },
        {
          "title": "Anpassa separata linjer för kvinnor och män",
          "purpose": "Sambandet kan se olika ut i grupperna. Du kan först dela upp data eller använda en interaktion med *.",
          "code": "Längd_kvinna <- subset(Längder, Kön == \"Kvinna\")\nLängd_man <- subset(Längder, Kön == \"Man\")\n\nlm(Fotlängd_cm ~ Längd_cm, data = Längd_kvinna)\nlm(Fotlängd_cm ~ Längd_cm, data = Längd_man)\n\n# Alternativt:\nlm(Fotlängd_cm ~ Längd_cm * Kön, data = Längder)",
          "output": "Kvinnor:\nFotlängd_cm = -2.51 + 0.165 · Längd_cm\n\nMän:\nFotlängd_cm = -5.43 + 0.179 · Längd_cm",
          "interpretation": "<strong>Tolkning:</strong> Lutningen är något större för män i detta material. Skillnaden ska inte överdrivas: titta på osäkerheten och på hur punkterna ligger innan du påstår att sambanden verkligen skiljer sig.",
          "practice": "Jämför de två lutningarna. Vad mer än punktskattningarna behöver du för att bedöma skillnaden?"
        },
        {
          "title": "Korrelations- och determinationskoefficient",
          "purpose": "Korrelationen r mäter riktning och styrka i ett linjärt samband. I enkel linjär regression med intercept är R² lika med r².",
          "code": "cor(Längder$Längd_cm, Längder$Fotlängd_cm)\ncor(Längder$Längd_cm, Längder$Fotlängd_cm)^2",
          "output": "cor(...)       0.8546\ncor(...)^2     0.7303",
          "interpretation": "<strong>Tolkning:</strong> Korrelationen 0,855 visar ett starkt positivt linjärt samband. R² = 0,730 betyder att ungefär 73 % av variationen i fotlängd beskrivs av den linjära modellen med längd som förklarande variabel.",
          "quiz": {
            "q": "Vad betyder R² = 0,7303 här?",
            "options": [
              "Modellen förklarar ungefär 73 % av variationen i fotlängd",
              "73 % av personerna är män",
              "Fotlängden ökar alltid med 73 cm"
            ],
            "answer": 0,
            "explain": "Rätt. R² handlar om variationen i den beroende variabeln."
          },
          "practice": "Kan ett högt R² bevisa ett orsakssamband? Motivera."
        },
        {
          "title": "Testa lutningen och beräkna konfidensintervall",
          "purpose": "summary() testar bland annat H₀: β₁ = 0. confint() ger intervall för koefficienterna.",
          "code": "summary(resultat)\nconfint(resultat)\nconfint(resultat, level = 0.90)",
          "output": "Coefficient             Estimate   Std. Error   t value      Pr(>|t|)\n(Intercept)              -1.2416      1.1803    -1.052       0.294\nLängd_cm                  0.1567      0.0068    23.151       < 2e-16\n\n95 % CI för lutningen: [0.1433, 0.1700]",
          "interpretation": "<strong>Tolkning:</strong> p-värdet för lutningen är mycket litet. Det finns stark evidens mot H₀: β₁ = 0 i detta material. Ett 95-procentigt konfidensintervall för lutningen är ungefär 0,143–0,170 cm fotlängd per cm kroppslängd.",
          "note": "Ett litet p-värde visar att en noll-lutning är svår att förena med data. Det säger inte ensamt hur bra modellen är eller att sambandet är kausalt.",
          "practice": "Jämför 90 % och 95 % intervallen. Vilket är bredare?"
        },
        {
          "title": "Undersök avvikande observationer",
          "purpose": "En observation kan påverka linjen mycket. Markera eller läs av radnummer i ett diagram innan du tar bort något.",
          "code": "plot(Fotlängd_cm ~ Längd_cm, data = Längder)\nabline(resultat)\n\n# Hitta stora standardiserade residualer\nwhich(abs(rstandard(resultat)) > 2)\nLängder[c(148, 179), ]\n\n# Ta bara bort en rad om du har saklig grund.\n# Exempel efter att ett fel har bekräftats:\n# ny_Längder <- Längder[-148, ]",
          "output": "Två rader att undersöka närmare:\nRad 148: Längd 164.6 cm, fotlängd 22.2 cm\nRad 179: Längd 161.0 cm, fotlängd 26.0 cm\n\nRaderna är kvar i modellen i denna guide.",
          "interpretation": "<strong>Var försiktig:</strong> En avvikande observation ska inte tas bort bara för att den ligger långt från linjen. Kontrollera om det är ett skrivfel, ett mätfel eller en verklig person. Om du tar bort flera rader, skriv till exempel Längder[-c(148, 179), ] – inte data[-c(148, 179), ].",
          "note": "Jämför gärna resultatet före och efter eventuell borttagning. Dokumentera alltid vilka rader som ändrats och varför.",
          "practice": "Jämför konfidensintervall och prediktionsintervall vid samma kroppslängd."
        },
        {
          "title": "Kontrollera residualerna",
          "purpose": "Residualerna är skillnaden mellan observerat och anpassat värde. Graferna hjälper dig att bedöma linjäritet, normalitet och konstant varians.",
          "code": "# Normal probability plot\nqqnorm(residuals(resultat))\nqqline(residuals(resultat))\n\n# Standardiserade residualer mot x\nplot(Längder$Längd_cm, rstandard(resultat),\n     xlab = \"Längd_cm\", ylab = \"Standardiserad residual\")\nabline(h = 0, lty = 2)",
          "output": "QQ-plot:\nPunkterna bör ligga ungefär längs en rak linje.\n\nResidualdiagram:\nSök efter slumpmässig spridning runt 0,\nutan tydlig kurva eller trattform.",
          "interpretation": "<strong>Modellkontroll:</strong> En tydlig kurva kan tyda på att sambandet inte är linjärt. En trattform kan tyda på att variansen förändras. Ett enstaka avvikande värde kan ha stor påverkan. Bedöm alltid residualgrafiken tillsammans med sakområdet.",
          "note": "Oberoende observationer bedöms utifrån hur data samlades in. QQ-diagrammet granskar residualernas normalitet, som används vid de vanliga testerna och intervallen; det kräver inte att kroppslängden är normalfördelad.",
          "practice": "Undersök raderna 148 och 179 utan att ta bort dem. Vad skulle du behöva veta innan du ändrar data?"
        },
        {
          "title": "Skriv en statistisk slutsats",
          "purpose": "Avsluta med en mening som kopplar koefficient, osäkerhet och modellens begränsningar till frågan.",
          "code": "# Exempel på rapportering\n# \"Det finns ett starkt positivt linjärt samband mellan\n# kroppslängd och fotlängd (r = 0.855).\n# Den skattade lutningen är 0.157 cm per cm\n# (95 % KI: 0.143–0.170).\n# Modellen förklarar cirka 73 % av variationen.\"",
          "output": "r = 0.8546\nR² = 0.7303\nβ1 = 0.1567\n95 % KI för β1: 0.1433 till 0.1700",
          "interpretation": "<strong>Kom ihåg:</strong> En modell är en förenklad beskrivning. Den kan vara användbar även om den inte förklarar all variation, men slutsatsen måste bygga på både siffror, diagram och rimliga modellantaganden.",
          "practice": "Beskriv eventuella mönster i residualdiagrammet."
        }
      ]
    },
    "inference": {
      "number": "03",
      "title": "Inferens i R",
      "short": "Från stickprov till population",
      "file": "Längder.xlsx",
      "fileUrl": "Längder.xlsx",
      "lede": "Lär dig att använda konfidensintervall och hypotestest för att dra slutsatser bortom stickprovet.",
      "hero": "Från stickprov till en försiktig slutsats",
      "copy": "Vi använder längddata för att träna på en- och tvåstickprovstest, andelar och icke-parametriska metoder. Frågan är inte bara vad stickprovet visar, utan hur säkert vi kan uttala oss om en population.",
      "tags": [
        "t-test",
        "konfidensintervall",
        "Wilcoxon"
      ],
      "quick": [
        "Ett konfidensintervall visar rimliga värden för en populationsparameter.",
        "Ett p-värde bedöms mot en vald signifikansnivå.",
        "Statistisk signifikans är inte samma sak som praktisk betydelse."
      ],
      "steps": [
        {
          "title": "Importera och formulera frågan",
          "purpose": "Börja med att identifiera population, stickprov, parameter och vilken nollhypotes som ska testas.",
          "code": "# I RStudio: Environment → Import Dataset → From Excel...\n# Välj Längder.xlsx och döp dataobjektet till Längder\nhead(Längder)\nstr(Längder)\nsummary(Längder)\n\n# Exempel:\n# H0: μ = 175 cm\n# H1: μ ≠ 175 cm",
          "output": "n = 200\nMedellängd = 174.22 cm\nStandardavvikelse = 8.61 cm\n\nParameter: populationens medellängd μ",
          "interpretation": "<strong>Tänk först:</strong> μ är populationens okända medellängd. Stickprovets medelvärde 174,22 cm är en skattning av μ. Inferens handlar om osäkerheten i den skattningen.",
          "note": "Importera data direkt i RStudio: öppna panelen Environment, välj Import Dataset och sedan From Excel. Välj Längder.xlsx och kontrollera att dataobjektet heter Längder. För inferens behöver observationerna vara oberoende och urvalet relevant för populationen. Urvalsmetoden är inte beskriven i filen, så populationstolkningarna här är övningar under dessa antaganden.",
          "practice": "Vilken population vill du uttala dig om, och vet du hur personerna valdes ut?"
        },
        {
          "title": "Dubbelsidigt t-test och 95 % KI",
          "purpose": "Vi testar om populationens medellängd skiljer sig från 175 cm och beräknar ett 95-procentigt konfidensintervall. t.test() använder 0 som jämförelsevärde om du glömmer mu.",
          "code": "t.test(Längder$Längd_cm, mu = 175,\n       conf.level = 0.95)",
          "output": "One Sample t-test\nmean = 174.22, t = -1.2814, df = 199\np-value = 0.2016\n95 percent confidence interval:\n173.01 175.43",
          "interpretation": "<strong>Tolkning:</strong> För testet H₀: μ = 175 cm är p = 0,202. Vid signifikansnivån 5 % förkastar vi inte H₀. 175 cm ligger i 95-procentigt konfidensintervall 173,01–175,43 cm.",
          "quiz": {
            "q": "Vad betyder att p = 0,2016?",
            "options": [
              "Det finns inte tillräckligt stark evidens mot μ = 175 cm vid 5 % nivå",
              "Sannolikheten att H₀ är sann är exakt 20,16 %",
              "Alla personer är exakt 175 cm"
            ],
            "answer": 0,
            "explain": "Rätt. P-värdet är evidens mot en nollhypotes, inte sannolikheten att hypotesen är sann."
          },
          "note": "En 95-procentig konfidensintervallmetod täcker det sanna medelvärdet i cirka 95 % av upprepade stickprov, under antagandena. Intervallet beskriver inte var 95 % av personernas längder finns.",
          "practice": "Förklara med egna ord varför p > 0,05 inte bevisar att nollhypotesen är sann."
        },
        {
          "title": "Ändra konfidensgrad och riktningshypotes",
          "purpose": "Du kan göra ett 90-procentigt intervall eller ett ensidigt test när frågan är riktad i förväg.",
          "code": "# 90 % dubbelsidigt intervall\nt.test(Längder$Längd_cm, mu = 175,\n       conf.level = 0.90)\n\n# H1: μ < 175\nt.test(Längder$Längd_cm, mu = 175,\n       alternative = \"less\")\n\n# H1: μ > 175\nt.test(Längder$Längd_cm, mu = 175,\n       alternative = \"greater\")",
          "output": "Dubbelsidigt 90 % KI: 173.21 till 175.23 cm\n\nH1: μ < 175\nt = -1.2814, p = 0.1008\n\nH1: μ > 175\nt = -1.2814, p = 0.8992",
          "interpretation": "<strong>Riktning spelar roll:</strong> Medelvärdet i stickprovet är under 175 cm, men p-värdet för H1: μ < 175 är fortfarande större än 0,05. Vi har alltså inte tillräckligt stark evidens för att populationens medelvärde är lägre än 175 cm på 5-procentsnivån.",
          "note": "Välj ensidigt eller dubbelsidigt test utifrån frågan innan du tittar på resultatet. Byt inte riktning efteråt för att få ett mindre p-värde.",
          "practice": "Varför måste en ensidig riktning bestämmas innan resultaten granskas?"
        },
        {
          "title": "Konfidensintervall för en andel",
          "purpose": "Skapa en indikator för personer längre än 175 cm. Medelvärdet av en 0/1-variabel är andelen ettor.",
          "code": "Lång <- ifelse(Längder$Längd_cm > 175, 1, 0)\nmean(Lång)\n\n# Exakt binomialintervall för en andel\nbinom.test(sum(Lång), length(Lång))\n\n# Jämför med t-approximationen i underlaget\nt.test(Lång)",
          "output": "Antal längre än 175 cm: 94 av 200\nAndel: 0.47\n\n95 % exakt binomialintervall:\ncirka 0.399 till 0.542\n\n95 % KI med t-approximation:\n0.4002 till 0.5398",
          "interpretation": "<strong>47 % i stickprovet är längre än 175 cm.</strong> binom.test() ger ett exakt binomialintervall på cirka 39,9–54,2 %. Det passar en andel. t.test() på en 0/1-variabel ger här en närliggande approximation. Intervallen bygger på oberoende observationer från en relevant population.",
          "quiz": {
            "q": "Varför blir mean(Lång) en andel?",
            "options": [
              "För att varje person kodas 0 eller 1 och medelvärdet blir andelen ettor",
              "För att R automatiskt omvandlar alla variabler till procent",
              "För att variabeln innehåller längder i cm"
            ],
            "answer": 0,
            "explain": "Rätt. Om 94 av 200 har värdet 1 blir medelvärdet 94/200 = 0,47."
          },
          "practice": "Ändra gränsen från 175 till 180 cm. Beräkna den nya andelen och ett intervall."
        },
        {
          "title": "Jämför två oberoende populationer",
          "purpose": "Med t.test(Längd_cm ~ Kön) jämför vi kvinnors och mäns medellängd. R använder som standard Welch-testet.",
          "code": "t.test(Längd_cm ~ Kön, data = Längder)",
          "output": "Kvinna: mean = 168.036 cm\nMan:    mean = 180.404 cm\n\nWelch Two Sample t-test\nt = -14.605, df ≈ 197.22\np-value < 0.0001\n95 % KI för (Kvinna − Man):\n-14.04 till -10.70 cm",
          "interpretation": "<strong>Tolkning:</strong> Skillnaden i stickprovet är 12,37 cm. Det mycket lilla p-värdet ger stark evidens för att medellängderna skiljer sig mellan populationerna som grupperna representerar.",
          "note": "R ordnar grupperna i nivåordning. Därför blir riktningen här Kvinna minus Man. Läs alltid gruppmedelvärdena innan du tolkar tecknet på skillnaden.",
          "practice": "Beskriv skillnaden med både riktning, enhet och konfidensintervall."
        },
        {
          "title": "Wilcoxons teckenrangtest för parade data",
          "purpose": "När två mätningar hör ihop parvis och normalfördelning är tveksam kan Wilcoxons parade test användas.",
          "code": "Före  <- c(145, 138, 150, 142, 135)\nEfter <- c(130, 132, 138, 141, 128)\n\nwilcox.test(Före, Efter, paired = TRUE)",
          "output": "Wilcoxon signed rank test\nV = 15, p-value = 0.0625\nalternative hypothesis: true location shift is not equal to 0",
          "interpretation": "<strong>Tolkning:</strong> Alla fem eftervärden är lägre än före-värdena, men med så få par blir p = 0,0625. Vid 5 % nivå förkastar vi inte nollhypotesen. Resultatet ligger nära gränsen, så visa även de faktiska skillnaderna.",
          "note": "Detta är ett separat, konstruerat exempel med fem par. Teckenrangtestet kräver oberoende par och, för tolkningen som ett test av lägesskillnad, en ungefär symmetrisk fördelning av differenserna. Ett parat t-test är ett alternativ när dess antaganden är rimliga.",
          "practice": "Beräkna Före - Efter. Varför är ett test för oberoende grupper olämpligt här?"
        },
        {
          "title": "Wilcoxon rangsummetest för två grupper",
          "purpose": "När observationerna kommer från två oberoende grupper och normalfördelning är tveksam kan rangsummetestet jämföra gruppernas lägen.",
          "code": "# Samma variabel, grupperade med Kön\nwilcox.test(Längd_cm ~ Kön, data = Längder)\n\n# Två separata vektorer\nPopulation_1 <- c(12, 15, 18, 14, 20)\nPopulation_2 <- c(19, 25, 22, 18, 30, 21, 24)\nwilcox.test(Population_1, Population_2,\n            exact = FALSE, correct = TRUE)",
          "output": "För de separata vektorerna:\nW = 2.5, p-value = 0.0183\n\nDet finns evidens för att gruppernas fördelningar\ninte ligger på samma nivå vid 5 % nivå.",
          "interpretation": "<strong>Viktigt:</strong> Wilcoxon-testet är ett rangbaserat test. Skriv inte automatiskt att det testar skillnad i medelvärden. Beskriv vad testet faktiskt jämför och använd medianer eller rangfördelningar när det passar.",
          "note": "Det andra exemplet använder konstruerade vektorer. De innehåller lika värden (ties), så vi anger normalapproximation med kontinuitetskorrektion. Tolkning som skillnad i läge kräver jämförbar fördelningsform; testet är inte generellt ett test av medianer.",
          "practice": "Beräkna medianen i var och en av de två konstruerade grupperna."
        },
        {
          "title": "Välj metod och skriv slutsatsen",
          "purpose": "Avsluta med att koppla frågan till design, antaganden och vald metod.",
          "code": "# Välj efter frågan och hur data samlades in\n# Ett medelvärde: t.test(x, mu = jämförelsevärde)\n# Oberoende grupper: t.test(y ~ grupp)\n# Parade mätningar: t.test(före, efter, paired = TRUE)\n# Rangbaserat alternativ för par:\n# wilcox.test(före, efter, paired = TRUE)\n# En andel: binom.test(antal, n)\n# Läs skattning, konfidensintervall och p-värde.",
          "output": "En komplett slutsats innehåller:\n• vilken parameter eller skillnad som undersöks\n• skattning och konfidensintervall\n• testets p-värde och vald nivå\n• slutsats med rätt riktning\n• relevant begränsning",
          "interpretation": "<strong>Exempel:</strong> Stickprovet ger ett medelvärde på 174,22 cm. Ett 95-procentigt KI för populationsmedelvärdet är 173,01–175,43 cm. Testet mot 175 cm ger p = 0,202, så materialet ger inte tillräckligt stark evidens för en skillnad vid 5 % nivå.",
          "practice": "Välj en fråga och skriv en slutsats som innehåller skattning, osäkerhet och antaganden."
        }
      ]
    },
    "simulation": {
      "number": "04",
      "title": "Simulering",
      "short": "Slump och fördelningar",
      "lede": "Se hur slump, medelvärden och sannolikhetsfördelningar beter sig genom upprepade försök i R.",
      "file": "simulation.R",
      "fileUrl": "simulation.R",
      "steps": [
        {
          "title": "Slumpa ett tärningskast",
          "purpose": "Börja med 10 000 kast och kontrollera om utfallet blir ungefär jämnt mellan 1 och 6.",
          "code": "set.seed(123)\nX <- sample(1:6, size = 10000, replace = TRUE)\ntable(X)\nprop.table(table(X))",
          "output": "Varje sida förekommer nära 1/6 (cirka 16,7 %). set.seed() gör försöket reproducerbart."
        },
        {
          "title": "Medelvärdet av två tärningar",
          "purpose": "Jämför enskilda kast med medelvärdet av två kast.",
          "code": "X1 <- sample(1:6, 10000, replace = TRUE)\nX2 <- sample(1:6, 10000, replace = TRUE)\nM2 <- (X1 + X2) / 2\nmean(M2)\nhist(M2)",
          "output": "Medelvärdet ligger nära 3,5. Fördelningen samlas mer kring mitten än för en enda tärning."
        },
        {
          "title": "Fler tärningar ger stabilare medelvärde",
          "purpose": "Öka antalet tärningar och se hur variationen minskar.",
          "code": "n <- 10\nkast <- replicate(n, sample(1:6, 10000, replace = TRUE))\nMn <- rowMeans(kast)\nmean(Mn)\nsd(Mn)\nhist(Mn)",
          "output": "Medelvärdet ligger fortfarande nära 3,5, men standardavvikelsen är mindre när fler tärningar ingår."
        },
        {
          "title": "Binomialfördelningen",
          "purpose": "Simulera antal träffar när 100 försök har sannolikheten 0,2 för träff.",
          "code": "Z1 <- rbinom(10000, size = 100, prob = 0.2)\nmean(Z1)\nsd(Z1)\nhist(Z1)",
          "output": "Medelvärdet ligger nära 20, eftersom 100 · 0,2 = 20."
        },
        {
          "title": "Hypergeometrisk fördelning",
          "purpose": "Simulera dragning utan återläggning från en ändlig population.",
          "code": "Z2 <- rhyper(nn = 10000, m = 120, n = 480, k = 100)\nmean(Z2)\nhist(Z2)",
          "output": "Här betyder m antal framgångar, n antal misslyckanden och k antal dragningar."
        },
        {
          "title": "Poissonfördelningen",
          "purpose": "Simulera ett antal händelser med väntevärde lambda = 5.",
          "code": "Z3 <- rpois(10000, lambda = 5)\nmean(Z3)\nvar(Z3)\nhist(Z3)",
          "output": "För Poissonfördelningen ligger både medelvärde och varians nära 5."
        },
        {
          "title": "Normalfördelningen",
          "purpose": "Skapa normalfördelade observationer och jämför centrum och spridning.",
          "code": "Z4 <- rnorm(10000, mean = 0, sd = 1)\nZ5 <- rnorm(10000, mean = 180, sd = 7)\nmean(Z4); sd(Z4)\nmean(Z5); sd(Z5)\nhist(Z5)",
          "output": "Z4 har ungefär medelvärde 0 och standardavvikelse 1. Z5 har ungefär medelvärde 180 och standardavvikelse 7."
        },
        {
          "title": "Sammanfatta en simulering",
          "purpose": "Använd samma arbetsflöde varje gång: kontrollera, sammanfatta och visualisera.",
          "code": "summary(Z5)\nquantile(Z5, c(0.025, 0.5, 0.975))\nset.seed(123)",
          "output": "summary() och quantile() ger en snabb bild av centrum, spridning och percentiler."
        }
      ],
      "quick": [
        "Slump kan upprepas med set.seed().",
        "Medelvärden stabiliseras när antalet observationer ökar.",
        "Välj rätt fördelning för situationen."
      ]
    }
  },
  "tallSadd": [
    [
      100,
      1,
      1
    ],
    [
      111,
      1,
      2
    ],
    [
      113,
      1,
      3
    ],
    [
      91,
      1,
      4
    ],
    [
      74,
      1,
      5
    ],
    [
      108,
      2,
      1
    ],
    [
      125,
      2,
      2
    ],
    [
      125,
      2,
      3
    ],
    [
      114,
      2,
      4
    ],
    [
      127,
      2,
      5
    ],
    [
      123,
      3,
      1
    ],
    [
      125,
      3,
      2
    ],
    [
      137,
      3,
      3
    ],
    [
      133,
      3,
      4
    ],
    [
      125,
      3,
      5
    ],
    [
      112,
      4,
      1
    ],
    [
      130,
      4,
      2
    ],
    [
      130,
      4,
      3
    ],
    [
      125,
      4,
      4
    ],
    [
      144,
      4,
      5
    ],
    [
      123,
      5,
      1
    ],
    [
      112,
      5,
      2
    ],
    [
      123,
      5,
      3
    ],
    [
      129,
      5,
      4
    ],
    [
      149,
      5,
      5
    ]
  ],
  "lengths": [
    [
      179,
      "Man",
      26.1
    ],
    [
      178.8,
      "Man",
      26.8
    ],
    [
      179.2,
      "Man",
      26.7
    ],
    [
      184.9,
      "Man",
      27.4
    ],
    [
      179.1,
      "Man",
      25.4
    ],
    [
      169.5,
      "Man",
      24
    ],
    [
      182.3,
      "Man",
      27.1
    ],
    [
      178.1,
      "Man",
      28
    ],
    [
      178.5,
      "Man",
      26.6
    ],
    [
      180.8,
      "Man",
      26.9
    ],
    [
      181.6,
      "Man",
      27
    ],
    [
      188.1,
      "Man",
      27.3
    ],
    [
      184.6,
      "Man",
      28.8
    ],
    [
      180.8,
      "Man",
      26.4
    ],
    [
      174.8,
      "Man",
      25.9
    ],
    [
      172.9,
      "Man",
      24.5
    ],
    [
      181.7,
      "Man",
      26
    ],
    [
      189.2,
      "Man",
      29.2
    ],
    [
      180.3,
      "Man",
      27.6
    ],
    [
      179.3,
      "Man",
      27.4
    ],
    [
      183.7,
      "Man",
      27.6
    ],
    [
      169.8,
      "Man",
      24.8
    ],
    [
      177.8,
      "Man",
      27.9
    ],
    [
      183.4,
      "Man",
      27.3
    ],
    [
      186.1,
      "Man",
      27.9
    ],
    [
      178.3,
      "Man",
      27.8
    ],
    [
      182.6,
      "Man",
      27.2
    ],
    [
      181.7,
      "Man",
      27
    ],
    [
      185.5,
      "Man",
      28.4
    ],
    [
      172.2,
      "Man",
      25
    ],
    [
      184,
      "Man",
      27.6
    ],
    [
      169.4,
      "Man",
      26.3
    ],
    [
      161.7,
      "Man",
      23.1
    ],
    [
      175.8,
      "Man",
      26.1
    ],
    [
      173.6,
      "Man",
      25.4
    ],
    [
      186.1,
      "Man",
      27.7
    ],
    [
      184.6,
      "Man",
      26.8
    ],
    [
      171.5,
      "Man",
      26.6
    ],
    [
      185.9,
      "Man",
      29
    ],
    [
      173,
      "Man",
      25
    ],
    [
      179.4,
      "Man",
      26.9
    ],
    [
      177.9,
      "Man",
      27
    ],
    [
      180.8,
      "Man",
      27.1
    ],
    [
      185.7,
      "Man",
      28.2
    ],
    [
      184.5,
      "Man",
      27.8
    ],
    [
      182.4,
      "Man",
      27.1
    ],
    [
      184.5,
      "Man",
      28.3
    ],
    [
      183.3,
      "Man",
      27.5
    ],
    [
      175.6,
      "Man",
      26.4
    ],
    [
      175,
      "Man",
      26.5
    ],
    [
      176.7,
      "Man",
      25.6
    ],
    [
      183.5,
      "Man",
      25.6
    ],
    [
      178.2,
      "Man",
      27.4
    ],
    [
      196.4,
      "Man",
      30.3
    ],
    [
      174.3,
      "Man",
      26.5
    ],
    [
      172.3,
      "Man",
      25.1
    ],
    [
      185.4,
      "Man",
      27.4
    ],
    [
      190,
      "Man",
      30.4
    ],
    [
      183.5,
      "Man",
      27
    ],
    [
      185.9,
      "Man",
      27.5
    ],
    [
      190,
      "Man",
      29.3
    ],
    [
      179.3,
      "Man",
      27.7
    ],
    [
      170,
      "Man",
      24.6
    ],
    [
      176.3,
      "Man",
      27.9
    ],
    [
      186.7,
      "Man",
      28.4
    ],
    [
      169.9,
      "Man",
      25
    ],
    [
      180.2,
      "Man",
      26.9
    ],
    [
      181.8,
      "Man",
      28.2
    ],
    [
      177.8,
      "Man",
      27.5
    ],
    [
      185.1,
      "Man",
      26.1
    ],
    [
      184.1,
      "Man",
      29
    ],
    [
      196.2,
      "Man",
      29.1
    ],
    [
      184.3,
      "Man",
      28
    ],
    [
      175.7,
      "Man",
      26.3
    ],
    [
      176.1,
      "Man",
      25.3
    ],
    [
      174.2,
      "Man",
      26.8
    ],
    [
      186.7,
      "Man",
      27.6
    ],
    [
      176,
      "Man",
      25.7
    ],
    [
      179.5,
      "Man",
      25.3
    ],
    [
      185.2,
      "Man",
      28.4
    ],
    [
      174.9,
      "Man",
      25.9
    ],
    [
      177.9,
      "Man",
      26
    ],
    [
      167.1,
      "Man",
      24.4
    ],
    [
      172.4,
      "Man",
      24.2
    ],
    [
      176,
      "Man",
      26
    ],
    [
      182.9,
      "Man",
      25.9
    ],
    [
      188.4,
      "Man",
      26.9
    ],
    [
      179.9,
      "Man",
      27.3
    ],
    [
      181.8,
      "Man",
      27.8
    ],
    [
      181.2,
      "Man",
      26.7
    ],
    [
      187.6,
      "Man",
      28.4
    ],
    [
      186.3,
      "Man",
      29.3
    ],
    [
      181.9,
      "Man",
      27.3
    ],
    [
      172.9,
      "Man",
      26.5
    ],
    [
      186.3,
      "Man",
      26.9
    ],
    [
      182.7,
      "Man",
      26.6
    ],
    [
      188.6,
      "Man",
      27.5
    ],
    [
      179.8,
      "Man",
      26.8
    ],
    [
      193.7,
      "Man",
      29.3
    ],
    [
      177.5,
      "Man",
      25.6
    ],
    [
      176.6,
      "Kvinna",
      27.9
    ],
    [
      167.7,
      "Kvinna",
      24.6
    ],
    [
      163.9,
      "Kvinna",
      23.6
    ],
    [
      160.2,
      "Kvinna",
      24.4
    ],
    [
      166.1,
      "Kvinna",
      25.1
    ],
    [
      175.5,
      "Kvinna",
      25.5
    ],
    [
      171.9,
      "Kvinna",
      26.6
    ],
    [
      171.1,
      "Kvinna",
      25.5
    ],
    [
      152.7,
      "Kvinna",
      22.5
    ],
    [
      171.3,
      "Kvinna",
      26.9
    ],
    [
      170.3,
      "Kvinna",
      26.1
    ],
    [
      163.7,
      "Kvinna",
      24.6
    ],
    [
      163.2,
      "Kvinna",
      25.2
    ],
    [
      167,
      "Kvinna",
      26.3
    ],
    [
      177.3,
      "Kvinna",
      26.4
    ],
    [
      160.7,
      "Kvinna",
      22.8
    ],
    [
      164.4,
      "Kvinna",
      24.2
    ],
    [
      175.2,
      "Kvinna",
      26.9
    ],
    [
      164.3,
      "Kvinna",
      24.3
    ],
    [
      164.8,
      "Kvinna",
      23.5
    ],
    [
      167.6,
      "Kvinna",
      24.8
    ],
    [
      159.6,
      "Kvinna",
      24.1
    ],
    [
      168.3,
      "Kvinna",
      24.2
    ],
    [
      159.7,
      "Kvinna",
      23.5
    ],
    [
      172.3,
      "Kvinna",
      26.2
    ],
    [
      167,
      "Kvinna",
      24.9
    ],
    [
      180.7,
      "Kvinna",
      27.3
    ],
    [
      168.7,
      "Kvinna",
      25.7
    ],
    [
      175.2,
      "Kvinna",
      24.2
    ],
    [
      159.2,
      "Kvinna",
      23.6
    ],
    [
      166.3,
      "Kvinna",
      25.1
    ],
    [
      168.9,
      "Kvinna",
      25.4
    ],
    [
      177.5,
      "Kvinna",
      27.3
    ],
    [
      156.9,
      "Kvinna",
      22.3
    ],
    [
      172.9,
      "Kvinna",
      25.8
    ],
    [
      170.5,
      "Kvinna",
      25.8
    ],
    [
      176.2,
      "Kvinna",
      26.8
    ],
    [
      171.3,
      "Kvinna",
      26.8
    ],
    [
      167.3,
      "Kvinna",
      24.2
    ],
    [
      163.9,
      "Kvinna",
      25
    ],
    [
      159.5,
      "Kvinna",
      24.1
    ],
    [
      168.2,
      "Kvinna",
      25.3
    ],
    [
      165.8,
      "Kvinna",
      26.1
    ],
    [
      179.1,
      "Kvinna",
      26.8
    ],
    [
      163.3,
      "Kvinna",
      24.1
    ],
    [
      168.9,
      "Kvinna",
      24.1
    ],
    [
      157.6,
      "Kvinna",
      23.9
    ],
    [
      164.6,
      "Kvinna",
      22.2
    ],
    [
      168.6,
      "Kvinna",
      25.6
    ],
    [
      171.9,
      "Kvinna",
      26.2
    ],
    [
      175.7,
      "Kvinna",
      26.8
    ],
    [
      166.7,
      "Kvinna",
      24.4
    ],
    [
      160.3,
      "Kvinna",
      23.9
    ],
    [
      169.7,
      "Kvinna",
      24.5
    ],
    [
      170.1,
      "Kvinna",
      24.5
    ],
    [
      169.9,
      "Kvinna",
      24.1
    ],
    [
      162.8,
      "Kvinna",
      23.8
    ],
    [
      173.8,
      "Kvinna",
      25.7
    ],
    [
      167.5,
      "Kvinna",
      25.2
    ],
    [
      171.2,
      "Kvinna",
      26.3
    ],
    [
      174.6,
      "Kvinna",
      27
    ],
    [
      170.7,
      "Kvinna",
      25.2
    ],
    [
      168.7,
      "Kvinna",
      24.4
    ],
    [
      179.9,
      "Kvinna",
      27.6
    ],
    [
      168.5,
      "Kvinna",
      26
    ],
    [
      165.2,
      "Kvinna",
      23.6
    ],
    [
      167.7,
      "Kvinna",
      25.7
    ],
    [
      175.9,
      "Kvinna",
      26.3
    ],
    [
      167.7,
      "Kvinna",
      24.9
    ],
    [
      170.1,
      "Kvinna",
      25.8
    ],
    [
      174.2,
      "Kvinna",
      27.3
    ],
    [
      163.9,
      "Kvinna",
      23.5
    ],
    [
      156.6,
      "Kvinna",
      24.6
    ],
    [
      168.8,
      "Kvinna",
      26.3
    ],
    [
      168.4,
      "Kvinna",
      26.9
    ],
    [
      163.4,
      "Kvinna",
      25
    ],
    [
      172.2,
      "Kvinna",
      25.4
    ],
    [
      170.6,
      "Kvinna",
      26.4
    ],
    [
      161,
      "Kvinna",
      26
    ],
    [
      170.1,
      "Kvinna",
      24
    ],
    [
      165.8,
      "Kvinna",
      25.4
    ],
    [
      158.1,
      "Kvinna",
      22.8
    ],
    [
      169.7,
      "Kvinna",
      24.8
    ],
    [
      166.7,
      "Kvinna",
      25
    ],
    [
      162.5,
      "Kvinna",
      24.5
    ],
    [
      170.1,
      "Kvinna",
      25.3
    ],
    [
      169.9,
      "Kvinna",
      24.4
    ],
    [
      163.5,
      "Kvinna",
      24
    ],
    [
      169.4,
      "Kvinna",
      26.4
    ],
    [
      173.1,
      "Kvinna",
      26
    ],
    [
      162.7,
      "Kvinna",
      26.1
    ],
    [
      169.3,
      "Kvinna",
      25
    ],
    [
      167,
      "Kvinna",
      24.1
    ],
    [
      180.6,
      "Kvinna",
      26.5
    ],
    [
      155.8,
      "Kvinna",
      24.2
    ],
    [
      171.2,
      "Kvinna",
      26.9
    ],
    [
      165.2,
      "Kvinna",
      24.8
    ],
    [
      166.4,
      "Kvinna",
      24.4
    ],
    [
      178.4,
      "Kvinna",
      27.3
    ],
    [
      166.9,
      "Kvinna",
      24.7
    ]
  ]
};
