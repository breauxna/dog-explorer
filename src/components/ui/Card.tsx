interface CardProps {
  title?: string;
  info?: string;
  img?: {
    src: string;
    alt: string;
  }
  onClick?: () => void;
  onImageLoad?: () => void;
}

export function Card({title, info, img, onClick, onImageLoad}: CardProps) {
  return (
    <article className={`max-w-sm rounded border overflow-hidden ${onClick && 'cursor-pointer hover:shadow-md'}`} onClick={onClick}>
      {img && <img className="object-cover w-full max-h-96 rounded-t-lg" src={img.src} alt={img.alt} onLoad={onImageLoad} />}
      <div className="px-6 py-4">
        <header className="font-bold text-xl mb-2">{title}</header>
        <section>
          <p className="text-gray-700 text-base line-clamp-3">{info}</p>
        </section>
      </div>
    </article>
  )
}