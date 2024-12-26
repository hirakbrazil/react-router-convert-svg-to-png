import React from "react";
import { Slider } from "@/components/ui/slider";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}

const SliderInput = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
}: SliderInputProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-lg text-gray-700">{label}</label>
        <div className="bg-secondary px-4 py-2 rounded-lg">
          <span className="text-xl font-semibold text-primary">
            {prefix}
            {value.toLocaleString()}
            {suffix}
          </span>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={max}
        min={min}
        step={step}
        className="py-4"
      />
    </div>
  );
};

export default SliderInput;