import { memo } from "react";
import { motion } from "motion/react";
import { Copy, Check, Phone, MessageCircle, Navigation } from "lucide-react";
import { interactiveCardVariant, iconHoverVariant } from "../../../../animations/hoverVariants";
import { resolveIcon } from "../../../../utils/iconResolver";
import { useCopyToClipboard } from "../../../../hooks/useCopyToClipboard";

const ACTION_ICON = {
  call: Phone,
  whatsapp: MessageCircle,
  map: Navigation,
};

const ActionButton = ({ action, onCopy, copied }) => {
  if (action.type === "copy") {
    return (
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Number copied" : action.label}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#2B2D42]/15 px-3.5 py-2 text-xs font-semibold text-[#2B2D42] transition-colors hover:border-[#2A9D8F]/50 hover:bg-[#2A9D8F]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A9D8F]"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : action.label}
      </button>
    );
  }

  const Icon = ACTION_ICON[action.type];
  return (
    <a
      href={action.href}
      target={action.type === "map" ? "_blank" : undefined}
      rel={action.type === "map" ? "noopener noreferrer" : undefined}
      aria-label={action.label}
      className="inline-flex items-center gap-1.5 rounded-full bg-[#2B2D42] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#E63946] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E63946]"
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {action.label}
    </a>
  );
};

const ContactInfoCard = ({ card }) => {
  const Icon = resolveIcon(card.icon);
  const { copied, copy } = useCopyToClipboard();

  const primaryNumberRaw = card.numbers?.[0]?.raw;

  return (
    <motion.article
      variants={interactiveCardVariant}
      whileHover="hover"
      aria-label={card.ariaLabel}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-6 shadow-lg backdrop-blur-xl"
    >
      {/* Animated gradient border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: "1.5px",
          background: "linear-gradient(135deg, #E63946, #F4A261, #2A9D8F)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        aria-hidden="true"
      />

      <motion.div
        variants={iconHoverVariant}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E63946] to-[#F4A261] text-white shadow-md"
      >
        {Icon && <Icon className="h-6 w-6" strokeWidth={2} />}
      </motion.div>

      <div>
        <h3 className="text-lg font-bold text-[#2B2D42]">{card.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-[#2B2D42]/65">
          {card.description}
        </p>
      </div>

      {/* Call Us card — dual numbers */}
      {card.numbers && (
        <ul className="flex flex-col gap-1.5">
          {card.numbers.map((n) => (
            <li key={n.id} className="flex items-center justify-between text-sm">
              <span className="text-[#2B2D42]/50">{n.label}</span>
              <span className="font-semibold text-[#2B2D42]">{n.value}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {card.actions.map((action, idx) => (
          <ActionButton
            key={`${card.id}-action-${idx}`}
            action={action}
            copied={copied}
            onCopy={() => copy(primaryNumberRaw || action.value || "")}
          />
        ))}
      </div>
    </motion.article>
  );
};

export default memo(ContactInfoCard);
