interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  hint?: string;
}

export function InputField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix = '£',
  hint,
}: InputFieldProps) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed)) {
      onChange(Math.min(max, Math.max(min, parsed)));
    } else if (raw === '') {
      onChange(min);
    }
  };

  const formatDisplay = (n: number) =>
    new Intl.NumberFormat('en-GB').format(n);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-200 transition-all">
          <span className="text-slate-500 text-sm font-medium">{prefix}</span>
          <input
            type="text"
            value={formatDisplay(value)}
            onChange={handleTextChange}
            className="w-24 text-right text-sm font-semibold text-slate-900 bg-transparent outline-none"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="relative pt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          className="input-range"
          style={{
            background: `linear-gradient(to right, #2563EB ${percentage}%, #E2E8F0 ${percentage}%)`,
          }}
        />
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-slate-400">{prefix}{formatDisplay(min)}</span>
          <span className="text-xs text-slate-400">{prefix}{formatDisplay(max)}</span>
        </div>
      </div>

      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
