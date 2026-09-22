# R-Labbar — Deskriptiv statistik i R
# Kör ett avsnitt i taget i RStudio.
# Välj Tallsådd.xlsx när filväljaren öppnas.

# 1. Importera och kontrollera data
install.packages("readxl")  # bara första gången
library(readxl)
Tallsådd <- read_excel(file.choose())
head(Tallsådd)
str(Tallsådd)
summary(Tallsådd)

# 2. Beräkna läges- och spridningsmått
mean(Tallsådd$Y)
var(Tallsådd$Y)
sd(Tallsådd$Y)
median(Tallsådd$Y)
quantile(Tallsådd$Y)
IQR(Tallsådd$Y)

# 3. Jämför grupper med aggregate()
aggregate(Y ~ B, data = Tallsådd, FUN = mean)
aggregate(Y ~ B, data = Tallsådd, FUN = sd)
aggregate(Y ~ B, data = Tallsådd, FUN = median)

# 4. Se fördelningen med histogram
hist(Tallsådd$Y,
     breaks = c(70, 90, 110, 130, 150),
     xaxp = c(70, 150, 4),
     main = "Antal grodda tallplantor",
     xlab = "Y", ylab = "Frekvens")

# 5. Jämför grupper med boxplot
boxplot(Y ~ B, data = Tallsådd,
        xlab = "Behandlingsgrupp B",
        ylab = "Antal grodda plantor",
        main = "Y uppdelat på B")

# 6. Undersök samband och tabeller
plot(jitter(Tallsådd$B), Tallsådd$Y,
     xlab = "Behandlingsgrupp B", ylab = "Y")

table(Tallsådd$A)
table(Tallsådd$B)
plot(ecdf(Tallsådd$Y),
     main = "Empirisk fördelningsfunktion")

# 7. Sammanfatta med rätt arbetsordning
# 1. Kontrollera
head(Tallsådd); str(Tallsådd); summary(Tallsådd)

# 2. Sammanfatta
mean(Tallsådd$Y); sd(Tallsådd$Y); median(Tallsådd$Y)
aggregate(Y ~ B, data = Tallsådd, FUN = mean)

# 3. Visualisera
boxplot(Y ~ B, data = Tallsådd)
hist(Tallsådd$Y)

# 4. Tolka
# Beskriv centrum, spridning, form och gruppskillnader.