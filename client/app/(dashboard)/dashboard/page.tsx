import React from "react";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

const DashboardPage = async () => {
  return (
    <>
      <h1 className="text-5xl">Dashboard</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
        praesentium, eaque porro dicta distinctio officia sint, alias excepturi
        veniam quaerat, architecto placeat sit voluptatibus ut illo quia totam
        aut. Tempore aperiam veniam voluptatum adipisci neque provident ad
        architecto numquam, unde et ab animi fugiat laudantium similique nobis,
        quam enim dolore quidem harum? Placeat dolor sapiente blanditiis,
        corporis, esse adipisci numquam sequi, aut inventore itaque nobis
        quaerat excepturi eveniet. Tempora totam nostrum soluta, maxime dolores
        sed dicta maiores ipsa excepturi quis aperiam minus odit nemo, fugiat
        aspernatur? Atque, quia labore quaerat corrupti quo tempore repellendus
        error consequuntur necessitatibus esse ratione quas, accusantium sed
        iure dolor blanditiis deleniti, repellat id vel dolore. Hic, nemo
        laboriosam veritatis repellendus nesciunt numquam fuga dignissimos modi
        suscipit. Molestiae soluta iste laborum quia nobis odio nisi minima
        corrupti, nesciunt eos quis quisquam, vel nihil reiciendis, facere rem
        in obcaecati? Odit laudantium eos, blanditiis, iste sit cumque accusamus
        natus quae corporis voluptate asperiores sapiente reiciendis, voluptas
        ex eveniet illum aspernatur nemo. Sequi molestiae repellendus delectus
        dolores consequuntur, similique doloremque minus dolorum distinctio
        nostrum quisquam commodi veritatis perferendis inventore voluptate ullam
        eius deleniti possimus corporis quae eaque odio cum? Rerum accusantium
        molestiae autem repellendus molestias explicabo dolore hic corporis
        dicta libero sapiente magni, illum ab labore ex, pariatur delectus
        adipisci corrupti! Error enim tenetur quibusdam architecto obcaecati
        voluptas quae modi aliquid. Libero nesciunt quidem aliquid eum aut
        labore commodi itaque fugit vel, ducimus veritatis a amet, illo error
        ex. Animi pariatur recusandae nemo id excepturi, minima, eius quo minus
        reiciendis alias veritatis adipisci suscipit ad voluptates optio
        expedita odit eligendi nobis esse. Aliquam saepe quasi dolore tempora
        veritatis reprehenderit consectetur totam facere, neque delectus in
        porro quaerat ipsa pariatur debitis, perspiciatis eveniet. Voluptates
        nihil commodi praesentium eaque, a beatae facere aliquid blanditiis, eum
        quidem quibusdam. Dicta voluptates excepturi et earum, consequuntur
        minima praesentium dolor dolore quod porro quibusdam! Officiis culpa,
        optio quisquam quo deleniti error commodi unde rem illum, dolorem vero
        nesciunt neque labore voluptas saepe laudantium animi ad adipisci porro
        sequi explicabo quis eaque? Aliquid amet qui, officia dignissimos sint
        cupiditate eligendi enim, doloremque vel voluptates cum expedita? Earum
        aspernatur sint veniam esse adipisci repellendus quos dolorem veritatis
        deleniti, beatae excepturi quas. Alias aliquam illo eligendi ab eius
        itaque ipsam quia quibusdam soluta corrupti cupiditate temporibus quis
        sequi quasi sapiente voluptatem voluptatibus, beatae, qui fugit, natus a
        saepe quam perferendis fugiat! Perspiciatis dolore vitae iure obcaecati,
        atque, fugiat similique exercitationem quidem minus repellendus adipisci
        odit culpa! Eum modi, molestias quis ab quam accusamus tempora maiores?
        Facere quos esse quam porro corporis cum iusto laborum quas atque ipsum
        sit, perspiciatis iure est alias ut placeat cumque nesciunt dolores
        velit facilis fugit et. Quae quidem deleniti deserunt unde, quisquam,
        dicta eos earum totam blanditiis corporis nostrum sequi est officia
        nobis perferendis facilis nesciunt culpa repudiandae inventore debitis
        porro? Ducimus officia commodi veritatis aut quo sint deleniti molestias
        illo delectus? Et ad in tempora. Quibusdam, voluptates unde ducimus
        suscipit odio, exercitationem eaque placeat qui, officiis quidem modi
        reiciendis laboriosam iusto veniam? Eos perspiciatis rerum modi illum
        molestias. Aperiam illo magnam id maiores explicabo dignissimos minus
        vero eaque iste beatae? Animi incidunt cumque non fugiat aut tempore.
        Quaerat placeat impedit voluptate tempore eius, omnis dignissimos enim
        nulla, nam fugiat nisi minus quia. Mollitia voluptas nam possimus qui
        non ducimus explicabo ratione quia, quos magni numquam perferendis
        accusamus sed, dignissimos ex nemo doloribus quo hic delectus facilis
        harum? Cumque nulla excepturi nostrum numquam magni eos quos optio unde
        sint, officia, dolor quis sunt ratione aut consequuntur. Sapiente
        accusamus rem, maxime harum consequuntur eligendi tempora laborum odio
        blanditiis suscipit sit iusto id delectus, omnis eum minima, error
        deserunt assumenda in odit? Iure, vero sit quae facere praesentium saepe
        blanditiis. Eos at labore alias explicabo sint, animi architecto. Iusto
        distinctio ipsum assumenda aliquid amet, dolorem ipsa doloremque beatae
        sit mollitia qui, sunt, quo praesentium. Obcaecati explicabo provident
        veritatis, necessitatibus quos, suscipit laborum ipsum et quibusdam quo
        animi at maxime neque voluptate doloribus dolore deleniti sequi culpa
        minima, tempora labore quas deserunt soluta fugit. Quas autem odio quod
        ipsa dolor natus praesentium in ullam reprehenderit totam? Voluptatum,
        earum? Vitae, blanditiis repudiandae nisi itaque corporis aliquid atque.
        Nobis totam officia odit iure, repudiandae ab, corporis cum numquam nemo
        eaque minus corrupti adipisci quaerat? Ipsam laboriosam molestiae
        maiores asperiores magni aliquid soluta impedit recusandae, odit facere
        tempore quaerat fugiat ducimus vel. Quae aperiam reiciendis architecto,
        sapiente vitae quidem ullam maiores vero ex, quis possimus! Minus
        similique necessitatibus rerum nostrum et, laborum optio eum dolore eos
        omnis animi unde eveniet ratione assumenda. Nostrum tempora possimus
        minima adipisci libero et quaerat maiores, asperiores natus distinctio
        debitis officia sit. Nisi, ratione distinctio! Nobis illo, reiciendis
        sequi maxime, magni tenetur, obcaecati optio dolor ea corporis vero iste
        temporibus. At soluta ab explicabo, quia dolorum optio ad neque dolorem,
        mollitia tempora sit voluptate, labore quo fugit adipisci. Ipsa,
        suscipit? Deserunt id sequi cupiditate mollitia nam dignissimos porro
        obcaecati ipsum, aperiam suscipit veritatis, repellendus molestias
        nesciunt nobis tempora voluptatem expedita quisquam voluptates eligendi.
        Nam, sequi nemo dolor necessitatibus labore odio nobis, sapiente
        provident officiis repudiandae ratione alias asperiores. Cumque,
        provident. Atque consequuntur dicta recusandae vero sunt, cumque quas
        necessitatibus distinctio suscipit iste illum, eligendi nobis placeat
        porro? Quam recusandae deserunt possimus nesciunt nulla, facilis
        quisquam natus placeat tempora ducimus, dolore incidunt earum voluptates
        quis facere, molestiae vel amet alias fuga tempore non excepturi.
        Facilis iusto maiores possimus iste! Voluptatibus, obcaecati placeat
        quasi quis distinctio ipsum ab ullam deleniti tempora quod. Voluptas,
        repudiandae! Accusamus quod aliquam eius, sint molestias facilis at
        illum architecto quos modi beatae nemo iste sunt eum optio? Quis
        excepturi incidunt enim neque, ea natus assumenda, provident perferendis
        expedita harum officia. Id reprehenderit corrupti dignissimos ad
        similique molestiae ipsum blanditiis ducimus earum, sed nostrum
        recusandae voluptate minus iusto distinctio hic aliquid ullam cupiditate
        sunt adipisci voluptas illo dolor rerum vitae. Voluptates libero iste
        praesentium pariatur natus nesciunt voluptate! Laboriosam reiciendis
        quos aliquam at magnam inventore voluptatibus voluptate aspernatur
        nesciunt, eveniet eius suscipit dolorum veniam beatae distinctio rerum
        quae soluta fugit fuga asperiores.
      </p>
    </>
  );
};

export default DashboardPage;
