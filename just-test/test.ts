function countSegments(s: string): number {
  const segments = s.split(' ');

  return segments.length;
}

console.log(countSegments('Hello, my name is John'));
