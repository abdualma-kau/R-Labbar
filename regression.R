# R-Labbar: Enkel linjär regression
# Importera först Längder.xlsx i RStudio via Environment -> Import Dataset -> From Excel...
# Döp dataobjektet till Längder.
head(Längder)
str(Längder)
summary(Längder)

resultat <- lm(Fotlängd_cm ~ Längd_cm, data = Längder)
summary(resultat)
confint(resultat)
qqnorm(residuals(resultat)); qqline(residuals(resultat))
plot(Längder$Längd_cm, rstandard(resultat))
