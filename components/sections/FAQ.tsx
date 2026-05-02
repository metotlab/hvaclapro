import { Accordion } from "@/components/ui/Accordion";

export function FAQ({ items, title = "Frequently Asked Questions" }: { items: { question: string; answer: string }[]; title?: string }) {
  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-primary mb-5">{title}</h2>
      <Accordion items={items} />
    </section>
  );
}
