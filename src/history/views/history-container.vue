<template>
  <div>
    <a-divider>Recibos por honorarios</a-divider>

    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
      bordered
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a @click="onDelete(record)">Borrar</a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "Nº",
    dataIndex: "id",
  },
  {
    title: "Fecha Emisión",
    dataIndex: "age",
  },
  {
    title: "Monto",
    dataIndex: "Monto",
  },
  {
    title: "Fecha Ven.",
    dataIndex: "tags",
  },
  {
    title: "Días",
    dataIndex: "tags",
  },
  {
    title: "TE %",
    dataIndex: "tags",
  },
  {
    title: "d %",
    dataIndex: "tags",
  },
  {
    title: "Descuento",
    dataIndex: "tags",
  },
  {
    title: "Coste ini.",
    dataIndex: "tags",
  },
  {
    title: "Coste fin.",
    dataIndex: "tags",
  },
  {
    title: "Val. Neto",
    dataIndex: "tags",
  },
  {
    title: "Val. Rec.",
    dataIndex: "tags",
  },
  {
    title: "Val. Ent.",
    dataIndex: "tags",
  },
  {
    title: "TCEA %",
    dataIndex: "tags",
  },
  {
    title: "Acción",
    key: "action",
  },
];
export default {
  name: "history-container",
  setup() {
    return {
      columns,
    };
  },
};
</script>

<style scoped></style>
