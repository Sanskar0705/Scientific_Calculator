using System;
using System.Linq;

namespace ScientificCalculator
{
    public class Statistics
    {
        public double Mean(double[] numbers) => numbers.Average();

        public double Median(double[] numbers)
        {
            var sorted = numbers.OrderBy(n => n).ToArray();
            int n = sorted.Length;
            if (n % 2 == 0)
                return (sorted[n / 2 - 1] + sorted[n / 2]) / 2.0;
            return sorted[n / 2];
        }

        public double StandardDeviation(double[] numbers)
        {
            double mean = Mean(numbers);
            return Math.Sqrt(numbers.Sum(x => Math.Pow(x - mean, 2)) / numbers.Length);
        }
    }
}
