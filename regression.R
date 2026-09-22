# R-Labbar — Enkel linjär regression i R
# Kör ett avsnitt i taget i RStudio.
# Välj Längder.xlsx när filväljaren öppnas.

# 1. Importera och kontrollera data
install.packages("readxl")  # bara första gången
library(readxl)
Längder <- read_excel(file.choose())
head(Längder)
str(Längder)
summary(Längder)

# 2. Anpassa en rät linje
plot(Fotlängd_cm ~ Längd_cm, data = Längder,
     xlab = "Kroppslängd (cm)",
     ylab = "Fotlängd (cm)")

resultat <- lm(Fotlängd_cm ~ Längd_cm,
               data = Längder)
abline(resultat, col = "darkgreen", lwd = 2)
summary(resultat)

# 3. Anpassa separata linjer för kvinnor och män
Längd_kvinna <- subset(Längder, Kön == "Kvinna")
Längd_man <- subset(Längder, Kön == "Man")

lm(Fotlängd_cm ~ Längd_cm, data = Längd_kvinna)
lm(Fotlängd_cm ~ Längd_cm, data = Längd_man)

# Alternativt:
lm(Fotlängd_cm ~ Längd_cm * Kön, data = Längder)

# 4. Korrelations- och determinationskoefficient
cor(Längder$Längd_cm, Längder$Fotlängd_cm)
cor(Längder$Längd_cm, Längder$Fotlängd_cm)^2

# 5. Testa lutningen och beräkna konfidensintervall
summary(resultat)
confint(resultat)
confint(resultat, level = 0.90)

# 6. Undersök avvikande observationer
plot(Fotlängd_cm ~ Längd_cm, data = Längder)
abline(resultat)

# Hitta stora standardiserade residualer
which(abs(rstandard(resultat)) > 2)
Längder[c(148, 179), ]

# Ta bara bort en rad om du har saklig grund.
# Exempel efter att ett fel har bekräftats:
# ny_Längder <- Längder[-148, ]

# 7. Kontrollera residualerna
# Normal probability plot
qqnorm(residuals(resultat))
qqline(residuals(resultat))

# Standardiserade residualer mot x
plot(Längder$Längd_cm, rstandard(resultat),
     xlab = "Längd_cm", ylab = "Standardiserad residual")
abline(h = 0, lty = 2)

# 8. Skriv en statistisk slutsats
# Exempel på rapportering
# "Det finns ett starkt positivt linjärt samband mellan
# kroppslängd och fotlängd (r = 0.855).
# Den skattade lutningen är 0.157 cm per cm
# (95 % KI: 0.143–0.170).
# Modellen förklarar cirka 73 % av variationen."