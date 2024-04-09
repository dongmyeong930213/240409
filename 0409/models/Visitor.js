//TODO: visitor 모델 정의

const Visitor =(Sequelize, DataTypes)=>{
    const model=Sequelize.define(
        'visitor',{
            id:{
                type: DataTypes.INTEGER,
                allowNull:false,
                primaryKey:true,
                autoINcrement:true
            },
            name:{
                type:DataTypes.STRING(10),
                allowNull:false,

            },
            comment:{
                type:DataTypes.TEXT('medium')

            }
        },
        {
            tableName:'visitor2',
            freezeTableName:true,
            timestamps:false
        }



    )
return model;
}


module.exports = Visitor