# R-Labbar: Inferens
# Importera först Längder.xlsx i RStudio via Environment -> Import Dataset -> From Excel...
# Döp dataobjektet till Längder.
head(Längder)
str(Längder)
summary(Längder)

t.test(Längder$Längd_cm)
t.test(Längder$Längd_cm, conf.level = 0.90)
t.test(Längder$Längd_cm, mu = 175)
t.test(Längder$Längd_cm ~ Längder$Kön)
