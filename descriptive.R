# R-Labbar: Deskriptiv statistik
# Importera först Tallsådd.xlsx i RStudio via Environment -> Import Dataset -> From Excel...
# Döp dataobjektet till Tallsådd.
head(Tallsådd)
str(Tallsådd)
summary(Tallsådd)

mean(Tallsådd$Y)
var(Tallsådd$Y)
sd(Tallsådd$Y)
median(Tallsådd$Y)
quantile(Tallsådd$Y)
IQR(Tallsådd$Y)
aggregate(Y ~ B, data = Tallsådd, FUN = mean)
hist(Tallsådd$Y)
boxplot(Y ~ B, data = Tallsådd)
