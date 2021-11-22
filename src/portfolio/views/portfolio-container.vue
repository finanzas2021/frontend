<template>
  <div>
    <a-steps :current="1" size="small">
      <a-step title="Finalizado" />
      <a-step title="En progeso" />
      <a-step title="En espera" />
    </a-steps>

    <a-row>
      <a-col :span="9">
        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="Moneda">
            <a-radio-group v-model:value="formState.Moneda">
              <a-radio value="0">Soles</a-radio>
              <a-radio value="1">Dolar</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="Días por año">
            <a-select v-model:value="formState.days_for_year" placeholder="Días por año">
              <a-select-option value="shanghai">360</a-select-option>
              <a-select-option value="beijing">365</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Plazo de tasa">
            <a-input-number v-model:value="formState.Plazo_Tasa" style="width: 100%" />
          </a-form-item>
          <a-form-item label="Tipo de tasa">
            <a-select v-model:value="formState.region" placeholder="selecciona">
              <a-select-option value="0">Efectiva</a-select-option>
              <a-select-option value="1">Nominal</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Valor Tasa">
            <a-input-number
              v-model:value="formState.Tasa"
              :min="0"
              :max="100"
              :formatter="(value) => `${value}%`"
              :parser="(value) => value.replace('%', '')"
              style="width: 100%"
            />
          </a-form-item>

          <a-form-item label="Fecha de Descuento">
            <a-date-picker
              v-model:value="formState.F_Descuento"
              type="date"
              placeholder="Selecciona una fecha"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="C/G Iniciales">
            <a-input v-model:value="formState.G_Iniciales" />
          </a-form-item>
          <a-form-item label="C/G Finales">
            <a-input v-model:value="formState.G_Finales" />
          </a-form-item>
        </a-form>
      </a-col>

      <a-col :span="9">
        <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="Fecha Giro y Vencimiento">
            <a-range-picker v-model:value="formState.F_Emision" style="width: 100%" />
          </a-form-item>

          <a-form-item label="Valor nominal">
            <a-input-number
              v-model:value="formState.Monto"
              style="width: 100%"
            />
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">Agregar</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="(VR) Valor Total a Recibir por la cartera"
            :precision="2"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px"
          >
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </a-statistic>
        </a-card>

        <a-card>
          <a-statistic
            title="(TCEA)"
            :precision="2"
            suffix="%"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px"
          >
            <template #prefix>
              <arrow-up-outlined />
            </template>
          </a-statistic>
        </a-card>
        <a-button type="primary" @click="onSubmit">Guardar</a-button>
      </a-col>
    </a-row>

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
import { computed, reactive, ref, toRaw } from "vue";
import _ from "lodash";

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
  name: "portfolio-container",
  setup() {
    const data = ref([]);
    const formState = reactive({
      UsuarioId: "",
      F_Emision: undefined,
      F_Pago: undefined,
      Moneda: "0",
      Monto: "",
      T_Tasa: "",
      Tasa: "",
      Plazo_Tasa: "",
      G_Iniciales: "",
      G_Finales: "",
      Monto_Cobrar: "",
      V_Entregado: "",
      TCEA: "",
      N_Dias: "",
      T_Descontada: "",
      V_Neto: "",
      Descuento: "",

      days_for_year: "",
      F_Descuento: undefined,
    });

    const prefixMoney = computed(() => {
      if (formState.Moneda === "1") return "$";
      else return "S/";
    });

    const onSubmit = () => {
      data.value.push({ Monto: formState.Monto });
      console.log("submit!", toRaw(formState));
      console.log("data!", data);
    };

    const onDelete = (item) => {
      console.log(item);
      _.remove(data.value, item);
    };

    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      onSubmit,
      onDelete,
      data,
      columns,
      prefixMoney,
    };
  },
};
</script>

<style scoped lang="less">
.ant-steps {
  margin: 30px 0;
}
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
