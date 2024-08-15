using System;

namespace ScientificCalculator
{
    public class Calculator
    {
        public double Sin(double x) => Math.Sin(x);
        public double Cos(double x) => Math.Cos(x);
        public double Tan(double x) => Math.Tan(x);
        
        public double Log(double x) => Math.Log10(x);
        public double Ln(double x) => Math.Log(x);
        
        public double Exp(double x) => Math.Exp(x);
        public double Power(double x, double y) => Math.Pow(x, y);
    }
}
