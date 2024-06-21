import React, { useMemo, useState } from "react";
import "./App.css";

const data = [
  "JavaScript programming",
  "HTML and CSS basics",
  "Frontend development",
  "Web design principles",
  "Dynamic content handling",
];

function App() {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(
    () =>
      data.filter((d) =>
        d.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      ),
    [search]
  );

  return (
    <div className="container">
      <div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search here"
          className="input"
        />
      </div>
      {filteredData.length > 0 && search.length > 0 && (
        <ul className="ul">
          {filteredData.map((f, i) => {
            const regexP = new RegExp(search, "gi");
            const matches = f.match(regexP);

            let modifiedText = f;

            matches?.forEach((match) => {
              modifiedText = modifiedText.replaceAll(
                `<span style="background:yellow">`,
                "%"
              );
              modifiedText = modifiedText.replaceAll(`</span>`, "*");

              modifiedText = modifiedText.replaceAll(
                match,
                `<span style="background:yellow">${match}</span>`
              );

              modifiedText = modifiedText.replaceAll(
                "%",
                `<span style="background:yellow">`
              );
              modifiedText = modifiedText.replaceAll("*", `</span>`);
            });

            return (
              <li key={i} dangerouslySetInnerHTML={{ __html: modifiedText }} />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
