export default function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="section-heading">
      <span>{children}</span>
    </h2>
  )
}
