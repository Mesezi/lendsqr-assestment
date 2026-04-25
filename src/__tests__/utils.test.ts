import { formatDateType, datesAreEqual, formatNumberWithCommas } from "@/lib/utils";

describe("formatDateType", () => {
  it("formats a valid ISO date string correctly", () => {
    const result = formatDateType("2021-04-07T23:11:37");
    expect(result).toMatch(/Apr 7, 2021/);
  });

  it("includes time in the formatted output", () => {
    const result = formatDateType("2021-04-07T23:11:37");
    expect(result).toMatch(/\d{1,2}:\d{2}\s?(AM|PM)/i);
  });
});

describe("datesAreEqual", () => {
  // Positive scenarios
  it("returns true for the same date", () => {
    const d1 = new Date("2024-01-15");
    const d2 = new Date("2024-01-15");
    expect(datesAreEqual(d1, d2)).toBe(true);
  });

  it("returns true regardless of time difference on same day", () => {
    const d1 = new Date("2024-01-15T08:00:00");
    const d2 = new Date("2024-01-15T23:59:59");
    expect(datesAreEqual(d1, d2)).toBe(true);
  });

  // Negative scenarios
  it("returns false for different days", () => {
    const d1 = new Date("2024-01-15");
    const d2 = new Date("2024-01-16");
    expect(datesAreEqual(d1, d2)).toBe(false);
  });

  it("returns false for different months", () => {
    const d1 = new Date("2024-01-15");
    const d2 = new Date("2024-02-15");
    expect(datesAreEqual(d1, d2)).toBe(false);
  });

  it("returns false for different years", () => {
    const d1 = new Date("2023-01-15");
    const d2 = new Date("2024-01-15");
    expect(datesAreEqual(d1, d2)).toBe(false);
  });
});

describe("formatNumberWithCommas", () => {
  // Positive scenarios
  it("formats thousands correctly", () => {
    expect(formatNumberWithCommas(1000)).toBe("1,000");
  });

  it("formats millions correctly", () => {
    expect(formatNumberWithCommas(1000000)).toBe("1,000,000");
  });

  it("handles numbers below 1000 without commas", () => {
    expect(formatNumberWithCommas(500)).toBe("500");
  });

  // Edge cases
  it("handles zero", () => {
    expect(formatNumberWithCommas(0)).toBe("0");
  });
});
