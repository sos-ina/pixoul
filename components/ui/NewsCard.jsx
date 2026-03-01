function formatDate(dateStr) {
  return dateStr;
}

export  function NewsCard({ item }) {
  return (
    <article className="rounded-none border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-md shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs sm:text-sm text-black/60 dark:text-white/60">
            {formatDate(item.date)}
          </p>
          <span className="inline-flex w-fit items-center rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.06] px-3 py-1 text-xs text-black/70 dark:text-white/70">
            NEWS UPDATE
          </span>
        </div>

        <h2 className="mt-3 text-xl sm:text-2xl font-semibold tracking-tight text-black dark:text-white">
          {item.title}
        </h2>

        {item.subTitle ? (
          <p className="mt-2 text-sm sm:text-base text-black/70 dark:text-white/70">
            {item.subTitle}
          </p>
        ) : null}

        <div className="mt-5 space-y-4 text-sm sm:text-base text-black/75 dark:text-white/75 leading-relaxed">
          {item.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {item.schedule?.length ? (
          <div className="mt-7">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Event Schedule
            </h3>

            <div className="mt-3 overflow-x-auto rounded-none border border-black/10 dark:border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/[0.03] dark:bg-white/[0.06]">
                  <tr className="text-black/70 dark:text-white/70">
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Time</th>
                    <th className="px-4 py-3 font-semibold">Event</th>
                  </tr>
                </thead>
                <tbody>
                  {item.schedule.map((row, i) => (
                    <tr
                      key={i}
                      className="border-t border-black/10 dark:border-white/10"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        {row.date}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {row.time}
                      </td>
                      <td className="px-4 py-3">{row.event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {item.quote ? (
          <div className="mt-7 rounded-none border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.06] p-5">
            <p className="text-sm sm:text-base italic text-black/80 dark:text-white/80 leading-relaxed">
              “{item.quote.text}”
            </p>
            {item.quote.by ? (
              <p className="mt-3 text-xs sm:text-sm text-black/60 dark:text-white/60">
                — {item.quote.by}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}