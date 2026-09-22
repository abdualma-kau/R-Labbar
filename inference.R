# R-Labbar — Inferens i R
# Kör ett avsnitt i taget i RStudio.
# Välj Längder.xlsx när filväljaren öppnas.

# 1. Importera och formulera frågan
install.packages("readxl")  # bara första gången
library(readxl)
Längder <- read_excel(file.choose())
head(Längder)
str(Längder)
summary(Längder)

# Exempel:
# H0: μ = 175 cm
# H1: μ ≠ 175 cm

# 2. Dubbelsidigt t-test och 95 % KI
t.test(Längder$Längd_cm, mu = 175,
       conf.level = 0.95)

# 3. Ändra konfidensgrad och riktningshypotes
# 90 % dubbelsidigt intervall
t.test(Längder$Längd_cm, mu = 175,
       conf.level = 0.90)

# H1: μ < 175
t.test(Längder$Längd_cm, mu = 175,
       alternative = "less")

# H1: μ > 175
t.test(Längder$Längd_cm, mu = 175,
       alternative = "greater")

# 4. Konfidensintervall för en andel
Lång <- ifelse(Längder$Längd_cm > 175, 1, 0)
mean(Lång)

# Exakt binomialintervall för en andel
binom.test(sum(Lång), length(Lång))

# Jämför med t-approximationen i underlaget
t.test(Lång)

# 5. Jämför två oberoende populationer
t.test(Längd_cm ~ Kön, data = Längder)

# 6. Wilcoxons teckenrangtest för parade data
Före  <- c(145, 138, 150, 142, 135)
Efter <- c(130, 132, 138, 141, 128)

wilcox.test(Före, Efter, paired = TRUE)

# 7. Wilcoxon rangsummetest för två grupper
# Samma variabel, grupperade med Kön
wilcox.test(Längd_cm ~ Kön, data = Längder)

# Två separata vektorer
Population_1 <- c(12, 15, 18, 14, 20)
Population_2 <- c(19, 25, 22, 18, 30, 21, 24)
wilcox.test(Population_1, Population_2,
            exact = FALSE, correct = TRUE)

# 8. Välj metod och skriv slutsatsen
# Välj efter frågan och hur data samlades in
# Ett medelvärde: t.test(x, mu = jämförelsevärde)
# Oberoende grupper: t.test(y ~ grupp)
# Parade mätningar: t.test(före, efter, paired = TRUE)
# Rangbaserat alternativ för par:
# wilcox.test(före, efter, paired = TRUE)
# En andel: binom.test(antal, n)
# Läs skattning, konfidensintervall och p-värde.