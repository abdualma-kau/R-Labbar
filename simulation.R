# R-Labbar – simulering
set.seed(123)
X <- sample(1:6, size = 10000, replace = TRUE)
table(X)
prop.table(table(X))

X1 <- sample(1:6, 10000, replace = TRUE)
X2 <- sample(1:6, 10000, replace = TRUE)
M2 <- (X1 + X2) / 2
mean(M2)
hist(M2)

n <- 10
kast <- replicate(n, sample(1:6, 10000, replace = TRUE))
Mn <- rowMeans(kast)
mean(Mn)
sd(Mn)
hist(Mn)

Z1 <- rbinom(10000, size = 100, prob = 0.2)
Z2 <- rhyper(nn = 10000, m = 120, n = 480, k = 100)
Z3 <- rpois(10000, lambda = 5)
Z4 <- rnorm(10000, mean = 0, sd = 1)
Z5 <- rnorm(10000, mean = 180, sd = 7)
summary(Z5)
quantile(Z5, c(0.025, 0.5, 0.975))
