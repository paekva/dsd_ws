﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication.Tutorial9.Exercise {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="Tutorial9.Exercise.PlusMinusServiceSoap")]
    public interface PlusMinusServiceSoap {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Plus", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        double Plus(double op1, double op2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Plus", ReplyAction="*")]
        System.Threading.Tasks.Task<double> PlusAsync(double op1, double op2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Minus", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        double Minus(double op1, double op2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/Minus", ReplyAction="*")]
        System.Threading.Tasks.Task<double> MinusAsync(double op1, double op2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/PlusMinus", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        WebApplication.Tutorial9.Exercise.PlusMinusResult PlusMinus(double op1, double op2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/PlusMinus", ReplyAction="*")]
        System.Threading.Tasks.Task<WebApplication.Tutorial9.Exercise.PlusMinusResult> PlusMinusAsync(double op1, double op2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/compute_ggt", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        int compute_ggt(int op1, int op2);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/compute_ggt", ReplyAction="*")]
        System.Threading.Tasks.Task<int> compute_ggtAsync(int op1, int op2);
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.8.4084.0")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://tempuri.org/")]
    public partial class PlusMinusResult : object, System.ComponentModel.INotifyPropertyChanged {
        
        private double plusResultField;
        
        private double minusResultField;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=0)]
        public double plusResult {
            get {
                return this.plusResultField;
            }
            set {
                this.plusResultField = value;
                this.RaisePropertyChanged("plusResult");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=1)]
        public double minusResult {
            get {
                return this.minusResultField;
            }
            set {
                this.minusResultField = value;
                this.RaisePropertyChanged("minusResult");
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface PlusMinusServiceSoapChannel : WebApplication.Tutorial9.Exercise.PlusMinusServiceSoap, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class PlusMinusServiceSoapClient : System.ServiceModel.ClientBase<WebApplication.Tutorial9.Exercise.PlusMinusServiceSoap>, WebApplication.Tutorial9.Exercise.PlusMinusServiceSoap {
        
        public PlusMinusServiceSoapClient() {
        }
        
        public PlusMinusServiceSoapClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public PlusMinusServiceSoapClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public PlusMinusServiceSoapClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public PlusMinusServiceSoapClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public double Plus(double op1, double op2) {
            return base.Channel.Plus(op1, op2);
        }
        
        public System.Threading.Tasks.Task<double> PlusAsync(double op1, double op2) {
            return base.Channel.PlusAsync(op1, op2);
        }
        
        public double Minus(double op1, double op2) {
            return base.Channel.Minus(op1, op2);
        }
        
        public System.Threading.Tasks.Task<double> MinusAsync(double op1, double op2) {
            return base.Channel.MinusAsync(op1, op2);
        }
        
        public WebApplication.Tutorial9.Exercise.PlusMinusResult PlusMinus(double op1, double op2) {
            return base.Channel.PlusMinus(op1, op2);
        }
        
        public System.Threading.Tasks.Task<WebApplication.Tutorial9.Exercise.PlusMinusResult> PlusMinusAsync(double op1, double op2) {
            return base.Channel.PlusMinusAsync(op1, op2);
        }
        
        public int compute_ggt(int op1, int op2) {
            return base.Channel.compute_ggt(op1, op2);
        }
        
        public System.Threading.Tasks.Task<int> compute_ggtAsync(int op1, int op2) {
            return base.Channel.compute_ggtAsync(op1, op2);
        }
    }
}
